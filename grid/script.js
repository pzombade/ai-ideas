document.addEventListener("DOMContentLoaded", () => {
    const gridEl = document.getElementById('grid');
    const pathLine = document.getElementById('animated-path');
    const btnPlay = document.getElementById('btn-play');
    const btnReset = document.getElementById('btn-reset');
    const runner = document.getElementById('runner');

    let ROWS = parseInt(document.getElementById('grid-rows')?.value) || 5;
    let COLS = parseInt(document.getElementById('grid-cols')?.value) || 5;

    // Default State
    let startCell = [1, 1];
    let endCell = [0, 0];

    let pathData = [
        [1, 1], [1, 0], [2, 0], [2, 1], [3, 1], [3, 0], [4, 0], [4, 1], [4, 2],
        [4, 3], [4, 4], [3, 4], [3, 3], [3, 2], [2, 2], [2, 3], [2, 4], [1, 4],
        [0, 4], [0, 3], [1, 3], [1, 2], [0, 2], [0, 1], [0, 0]
    ];

    let wallsData = [
        [[0, 0], [1, 0]],
        [[1, 3], [1, 4]],
        [[2, 1], [2, 2]],
        [[1, 3], [2, 3]],
        [[3, 2], [4, 2]],
    ];

    const svgOverlay = document.getElementById('path-overlay');
    let isAnimating = false;
    let animationFrameId = null;
    let confettiAnimId = null;
    let pathLength = 1000;

    // Grid sizes (60px cell + 8px gap)
    const cellWidth = 60;
    const cellHeight = 60;
    const gap = 8;

    function getCellCenter(r, c) {
        const cx = c * (cellWidth + gap) + cellWidth / 2;
        const cy = r * (cellHeight + gap) + cellHeight / 2;
        return { x: cx, y: cy };
    }

    function calculateSvgPath() {
        if (pathData.length === 0) return "";
        let d = "";
        pathData.forEach((coord, index) => {
            const center = getCellCenter(coord[0], coord[1]);
            if (index === 0) {
                d += `M ${center.x} ${center.y}`;
            } else {
                d += ` L ${center.x} ${center.y}`;
            }
        });
        return d;
    }

    let userPath = [];
    let isDragging = false;
    let timerInterval = null;
    let secondsElapsed = 0;

    function updateTimerDisplay() {
        const timerEl = document.getElementById('timer-display');
        if (!timerEl) return;
        const m = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
        const s = (secondsElapsed % 60).toString().padStart(2, '0');
        timerEl.textContent = `${m}:${s}`;
    }

    function startTimer() {
        if (timerInterval !== null) return;
        timerInterval = setInterval(() => {
            secondsElapsed++;
            updateTimerDisplay();
        }, 1000);
    }

    function stopTimer() {
        if (timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function resetTimer() {
        stopTimer();
        secondsElapsed = 0;
        updateTimerDisplay();
    }

    function hasWall(r1, c1, r2, c2) {
        for (let w of wallsData) {
            const [[wr1, wc1], [wr2, wc2]] = w;
            if ((r1 === wr1 && c1 === wc1 && r2 === wr2 && c2 === wc2) ||
                (r1 === wr2 && c1 === wc2 && r2 === wr1 && c2 === wc1)) {
                return true;
            }
        }
        return false;
    }

    function buildGridAndWalls() {
        gridEl.innerHTML = '';
        const existingWalls = svgOverlay.querySelectorAll('.wall-line');
        existingWalls.forEach(w => w.remove());

        // Setup dynamic grid layout
        gridEl.style.gridTemplateColumns = `repeat(${COLS}, 60px)`;
        gridEl.style.gridTemplateRows = `repeat(${ROWS}, 60px)`;

        // Create Grid
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.r = r;
                cell.dataset.c = c;

                if (startCell && r === startCell[0] && c === startCell[1]) {
                    cell.classList.add('start');
                    cell.textContent = "Start";
                } else if (endCell && r === endCell[0] && c === endCell[1]) {
                    cell.classList.add('end');
                    cell.textContent = "End";
                }

                // Interaction listeners
                cell.addEventListener('mousedown', () => handleCellClick(r, c));
                cell.addEventListener('mouseenter', () => handleCellDrag(r, c));
                
                cell.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    handleCellClick(r, c);
                }, { passive: false });
                
                gridEl.appendChild(cell);
            }
        }

        // Draw walls
        wallsData.forEach(([cellA, cellB]) => {
            const [r1, c1] = cellA;
            const [r2, c2] = cellB;

            let centerA = getCellCenter(r1, c1);
            let centerB = getCellCenter(r2, c2);

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.classList.add('wall-line');
            const halfWidth = 34; // 30 (half cell) + 4 (half gap)

            if (r1 === r2) {
                // Vertical wall
                const wallX = (centerA.x + centerB.x) / 2;
                line.setAttribute('x1', wallX);
                line.setAttribute('x2', wallX);
                line.setAttribute('y1', centerA.y - halfWidth);
                line.setAttribute('y2', centerA.y + halfWidth);
            } else if (c1 === c2) {
                // Horizontal wall
                const wallY = (centerA.y + centerB.y) / 2;
                line.setAttribute('y1', wallY);
                line.setAttribute('y2', wallY);
                line.setAttribute('x1', centerA.x - halfWidth);
                line.setAttribute('x2', centerA.x + halfWidth);
            }

            svgOverlay.insertBefore(line, pathLine);
        });

        const svgPathString = calculateSvgPath();
        pathLine.setAttribute("d", svgPathString);
        pathLength = pathLine.getTotalLength() || 1000;

        resetVisuals();
    }

    function solvePuzzle() {
        if (!startCell || !endCell) return [];

        const totalCells = ROWS * COLS;
        const visited = Array(ROWS).fill(0).map(() => Array(COLS).fill(false));
        const path = [];

        const dr = [0, 1, 0, -1];
        const dc = [1, 0, -1, 0];

        function dfs(r, c, count) {
            path.push([r, c]);
            visited[r][c] = true;

            if (r === endCell[0] && c === endCell[1]) {
                if (count === totalCells) {
                    return true;
                }
                visited[r][c] = false;
                path.pop();
                return false;
            }

            for (let i = 0; i < 4; i++) {
                const nr = r + dr[i];
                const nc = c + dc[i];

                if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !visited[nr][nc]) {
                    if (!hasWall(r, c, nr, nc)) {
                        if (dfs(nr, nc, count + 1)) {
                            return true;
                        }
                    }
                }
            }

            visited[r][c] = false;
            path.pop();
            return false;
        }

        if (dfs(startCell[0], startCell[1], 1)) {
            return path;
        }
        return [];
    }

    btnPlay.addEventListener('click', async () => {
        if (isAnimating) return;

        if (pathData.length === 0) {
            btnPlay.innerText = "Solving...";
            btnPlay.disabled = true;

            // Yield to browser to render the "Solving..." text
            await new Promise(resolve => setTimeout(resolve, 50));

            pathData = solvePuzzle();

            if (pathData.length === 0) {
                alert("No continuous Hamiltonian path found! Check if walls block all routes.");
                btnPlay.innerText = "Play Solution";
                btnPlay.disabled = false;
                return;
            }

            // Update SVG physically
            const svgPathString = calculateSvgPath();
            pathLine.setAttribute("d", svgPathString);
            pathLength = pathLine.getTotalLength() || 1000;
        }

        // Reset to clean state
        resetVisuals();

        // Force reflow for transition to take effect from starting state
        void pathLine.offsetWidth;

        isAnimating = true;
        btnPlay.disabled = true;

        // Path duration
        const duration = 4000; // ms
        pathLine.style.transition = `stroke-dashoffset ${duration}ms linear`;
        pathLine.style.strokeDashoffset = 0;

        runner.setAttribute('opacity', '1');

        const startCenter = getCellCenter(pathData[0][0], pathData[0][1]);
        runner.setAttribute('cx', startCenter.x);
        runner.setAttribute('cy', startCenter.y);

        let startTime = null;
        function animateRunner(timestamp) {
            if (!startTime) startTime = timestamp;
            let elapsed = timestamp - startTime;

            if (elapsed > duration) elapsed = duration;

            const ratio = elapsed / duration;
            const currentLen = ratio * pathLength;
            const point = pathLine.getPointAtLength(currentLen);

            runner.setAttribute('cx', point.x);
            runner.setAttribute('cy', point.y);

            if (elapsed < duration) {
                animationFrameId = requestAnimationFrame(animateRunner);
            } else {
                isAnimating = false;
                btnPlay.disabled = false;
                btnPlay.innerText = "Play Solution";
            }
        }
        animationFrameId = requestAnimationFrame(animateRunner);
    });

    function resetVisuals() {
        pathLength = pathLine.getTotalLength() || 1000;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        pathLine.style.transition = 'none';
        pathLine.style.strokeDasharray = pathLength;
        pathLine.style.strokeDashoffset = pathLength;
        runner.setAttribute('opacity', '0');
    }

    function clearPuzzle() {
        resetVisuals();
        
        document.getElementById('user-path')?.classList.remove('path-solved-pulse');
        
        if (confettiAnimId) {
            cancelAnimationFrame(confettiAnimId);
            confettiAnimId = null;
        }
        const confettiCanvas = document.getElementById('confetti-canvas');
        if (confettiCanvas) {
            const ctx = confettiCanvas.getContext('2d');
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }
        
        // Clear SVG path
        pathLine.setAttribute("d", "");
        
        // Clear grid and walls
        gridEl.innerHTML = '';
        const existingWalls = svgOverlay.querySelectorAll('.wall-line');
        existingWalls.forEach(w => w.remove());

        // Reset state
        startCell = null;
        endCell = null;
        wallsData = [];
        pathData = [];
        userPath = [];
        const userPathEl = document.getElementById('user-path');
        if (userPathEl) userPathEl.setAttribute('d', '');
        const msgEl = document.getElementById('status-message');
        if (msgEl) msgEl.textContent = '';
        
        resetTimer();

        // Clear debug canvas and file input
        const imageUpload = document.getElementById('image-upload');
        const debugCanvas = document.getElementById('debug-canvas');
        if (debugCanvas) {
            debugCanvas.style.display = 'none';
            const ctx = debugCanvas.getContext('2d');
            ctx.clearRect(0, 0, debugCanvas.width, debugCanvas.height);
        }
        if (imageUpload) {
            imageUpload.value = '';
        }
    }

    btnReset.addEventListener('click', () => {
        isAnimating = false;
        btnPlay.disabled = false;
        clearPuzzle();
    });

    // === Image Parsing Logic ===
    const imageUpload = document.getElementById('image-upload');
    const debugCanvas = document.getElementById('debug-canvas');
    if (!imageUpload || !debugCanvas) return; // Prevent crashes if UI not ready

    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                debugCanvas.width = img.width;
                debugCanvas.height = img.height;
                const ctx = debugCanvas.getContext('2d', { willReadFrequently: true });
                ctx.drawImage(img, 0, 0);
                parsePuzzleFromCanvas(debugCanvas);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    function parsePuzzleFromCanvas(canvas) {
        const width = canvas.width;
        const height = canvas.height;
        const ctx = canvas.getContext('2d');
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        function getRawPixel(x, y) {
            x = Math.floor(Math.max(0, Math.min(width - 1, x)));
            y = Math.floor(Math.max(0, Math.min(height - 1, y)));
            const idx = (y * width + x) * 4;
            return [data[idx], data[idx+1], data[idx+2]];
        }

        function getBright(x, y) {
            const [r, g, b] = getRawPixel(x, y);
            return (r + g + b) / 3;
        }

        // Auto-detect exact coordinates of grid lines
        function getLines(isHoriz) {
            const length = isHoriz ? width : height;
            const maxThickness = Math.floor(length * 0.05); // Allow up to 5% thickness for robust lines
            const start = Math.floor(length * 0.02);
            const end = Math.floor(length * 0.98);

            const allLines = [];

            for (let p = 0.1; p <= 0.9; p += 0.05) { // 17 slices for extreme accuracy
                const sliceFixed = Math.floor((isHoriz ? height : width) * p); 
                const linesCoords = [];
                let currentLineStart = -1;

                for (let i = start; i <= end; i++) {
                    let b = 255;
                    if (i < end) {
                        const px = isHoriz ? i : sliceFixed;
                        const py = isHoriz ? sliceFixed : i;
                        b = getBright(px, py);
                    }

                    if (b < 240) { 
                        if (currentLineStart === -1) currentLineStart = i;
                    } else {
                        if (currentLineStart !== -1) {
                            const thickness = i - currentLineStart;
                            if (thickness < maxThickness) {
                                linesCoords.push((currentLineStart + i) / 2);
                            }
                            currentLineStart = -1;
                        }
                    }
                }
                allLines.push(linesCoords);
            }

            const freq = {};
            let maxFreq = 0;
            let modeLen = 0;
            for (const coords of allLines) {
                const len = coords.length;
                if (len < 2 || len > 25) continue; 
                freq[len] = (freq[len] || 0) + 1;
                if (freq[len] > maxFreq) {
                    maxFreq = freq[len];
                    modeLen = len;
                }
            }

            const validArrays = allLines.filter(c => c.length === modeLen);
            if (validArrays.length === 0) return [0, length]; 

            const avgCoords = new Array(modeLen).fill(0);
            for (const coords of validArrays) {
                for (let i = 0; i < modeLen; i++) {
                    avgCoords[i] += coords[i];
                }
            }
            for (let i = 0; i < modeLen; i++) {
                avgCoords[i] /= validArrays.length;
            }
            return avgCoords;
        }

        const verticalLines = getLines(true);
        const horizontalLines = getLines(false);

        // Fallbacks
        COLS = Math.max(2, verticalLines.length - 1);
        ROWS = Math.max(2, horizontalLines.length - 1);

        const cellW = (verticalLines.length > 1) ? (verticalLines[verticalLines.length-1] - verticalLines[0]) / COLS : width / COLS;
        const cellH = (horizontalLines.length > 1) ? (horizontalLines[horizontalLines.length-1] - horizontalLines[0]) / ROWS : height / ROWS;

        function getCellCx(c) { return (verticalLines.length > 1) ? (verticalLines[c] + verticalLines[c+1])/2 : (c+0.5)*(width/COLS); }
        function getCellCy(r) { return (horizontalLines.length > 1) ? (horizontalLines[r] + horizontalLines[r+1])/2 : (r+0.5)*(height/ROWS); }
        function getRightBoundary(c) { return (verticalLines.length > 1) ? verticalLines[c+1] : (c+1)*(width/COLS); }
        function getBottomBoundary(r) { return (horizontalLines.length > 1) ? horizontalLines[r+1] : (r+1)*(height/ROWS); }

        let parsedStart = null;
        let parsedEnd = null;
        let parsedWalls = [];

        // Detect Start and End by scanning an area around the center robustly based on proportions
        const searchRadiusStartEnd = Math.floor(cellW * 0.25);
        const step = Math.max(1, Math.floor(searchRadiusStartEnd / 5));

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const cx = getCellCx(c);
                const cy = getCellCy(r);
                
                let isStart = false;
                let isEnd = false;
                
                for (let dx = -searchRadiusStartEnd; dx <= searchRadiusStartEnd; dx += step) {
                    for (let dy = -searchRadiusStartEnd; dy <= searchRadiusStartEnd; dy += step) {
                        const [red, green, blue] = getRawPixel(cx + dx, cy + dy);
                        if (green > red + 40 && green > blue + 40 && green > 100) isStart = true;
                        if (red > green + 40 && red > blue + 40 && red > 100) isEnd = true;
                    }
                }

                if (isStart) parsedStart = [r, c];
                if (isEnd) parsedEnd = [r, c];
            }
        }

        // Detect Blue Walls by scanning perpendicularly across boundaries proportionally
        const searchRadiusWall = Math.floor(cellW * 0.2);
        function hasBlueWall(startX, startY, scanDx, scanDy) {
            for (let i = -searchRadiusWall; i <= searchRadiusWall; i++) {
                const px = startX + scanDx * i;
                const py = startY + scanDy * i;
                const [red, green, blue] = getRawPixel(px, py);
                if (blue > red + 40 && blue > green + 10 && blue > 120) return true;
            }
            return false;
        }

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (c < COLS - 1) {
                    if (hasBlueWall(getRightBoundary(c), getCellCy(r), 1, 0)) {
                        parsedWalls.push([[r, c], [r, c + 1]]);
                    }
                }
                if (r < ROWS - 1) {
                    if (hasBlueWall(getCellCx(c), getBottomBoundary(r), 0, 1)) {
                        parsedWalls.push([[r, c], [r + 1, c]]);
                    }
                }
            }
        }

        // Clarify parsed elements
        if (parsedStart) startCell = parsedStart;
        if (parsedEnd) endCell = parsedEnd;
        
        wallsData = parsedWalls;
        
        pathData = [];
        
        buildGridAndWalls();
    }

    const btnLevelPrev = document.getElementById('btn-level-prev');
    const btnLevelNext = document.getElementById('btn-level-next');
    const levelDisplay = document.getElementById('level-display');
    const btnUploadTrigger = document.getElementById('btn-upload-trigger');
    const btnGenerate = document.getElementById('btn-generate');
    let currentLevel = 1;

    if (btnLevelPrev && btnLevelNext && levelDisplay) {
        function updateLevel() {
            levelDisplay.textContent = `LEVEL ${currentLevel}`;
            generateRandomPuzzle(currentLevel);
        }

        btnLevelPrev.addEventListener('click', () => {
            if (currentLevel > 1) {
                currentLevel--;
                updateLevel();
            }
        });

        btnLevelNext.addEventListener('click', () => {
            if (currentLevel < 5) {
                currentLevel++;
                updateLevel();
            }
        });

        if (btnGenerate) {
            btnGenerate.addEventListener('click', () => {
                updateLevel();
            });
        }

        // Initialize display by generating first puzzle
        setTimeout(updateLevel, 100);
    }

    if (btnUploadTrigger && imageUpload) {
        btnUploadTrigger.addEventListener('click', () => {
            imageUpload.click();
        });
    }

    function generateRandomPuzzle(level) {
        const sizes = {
            1: {r: 3, c: 3},
            2: {r: 4, c: 4},
            3: {r: 5, c: 5},
            4: {r: 6, c: 6},
            5: {r: 8, c: 8}
        };
        const size = sizes[level] || sizes[1];
        ROWS = size.r;
        COLS = size.c;

        clearPuzzle(); // Resets pathData etc.

        // Generate Hamiltonian Path
        const total = ROWS * COLS;
        let generatedPath = [];
        let visited = Array(ROWS).fill(0).map(() => Array(COLS).fill(false));
        const dr = [0, 1, 0, -1];
        const dc = [1, 0, -1, 0];

        function dfs(r, c, count) {
            generatedPath.push([r, c]);
            visited[r][c] = true;

            if (count === total) return true;

            let neighbors = [];
            for (let i = 0; i < 4; i++) {
                let nr = r + dr[i];
                let nc = c + dc[i];
                if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !visited[nr][nc]) {
                    let deg = 0;
                    for (let j = 0; j < 4; j++) {
                        let nnr = nr + dr[j];
                        let nnc = nc + dc[j];
                        if (nnr >= 0 && nnr < ROWS && nnc >= 0 && nnc < COLS && !visited[nnr][nnc]) {
                            deg++;
                        }
                    }
                    neighbors.push({nr, nc, deg, rand: Math.random()});
                }
            }
            
            neighbors.sort((a, b) => {
                if (a.deg !== b.deg) return a.deg - b.deg;
                return a.rand - b.rand;
            });

            for (let n of neighbors) {
                if (dfs(n.nr, n.nc, count + 1)) return true;
            }

            generatedPath.pop();
            visited[r][c] = false;
            return false;
        }

        // Random start position (retry until path is found)
        let found = false;
        let attempts = 0;
        while (!found && attempts < 100) {
            const startR = Math.floor(Math.random() * ROWS);
            const startC = Math.floor(Math.random() * COLS);
            visited = Array(ROWS).fill(0).map(() => Array(COLS).fill(false));
            generatedPath = [];
            found = dfs(startR, startC, 1);
            attempts++;
        }

        if (found) {
            startCell = generatedPath[0];
            endCell = generatedPath[generatedPath.length - 1];
        } else {
            // Fallback just in case
            startCell = [0, 0];
            endCell = [0, 0];
        }

        // Create Walls
        let pathEdges = new Set();
        for (let i = 0; i < generatedPath.length - 1; i++) {
            let [r1, c1] = generatedPath[i];
            let [r2, c2] = generatedPath[i+1];
            let e1 = `${r1},${c1}-${r2},${c2}`;
            let e2 = `${r2},${c2}-${r1},${c1}`;
            pathEdges.add(e1);
            pathEdges.add(e2);
        }

        let wallsSet = new Set();
        let potentialRemovals = [];

        // Initially add ALL non-path edges as walls to guarantee unique solution
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (c < COLS - 1) {
                    let e1 = `${r},${c}-${r},${c+1}`;
                    let e2 = `${r},${c+1}-${r},${c}`;
                    if (!pathEdges.has(e1)) {
                        wallsSet.add(e1); wallsSet.add(e2);
                        potentialRemovals.push({ w1: e1, w2: e2 });
                    }
                }
                if (r < ROWS - 1) {
                    let e1 = `${r},${c}-${r+1},${c}`;
                    let e2 = `${r+1},${c}-${r},${c}`;
                    if (!pathEdges.has(e1)) {
                        wallsSet.add(e1); wallsSet.add(e2);
                        potentialRemovals.push({ w1: e1, w2: e2 });
                    }
                }
            }
        }

        // Only start creating fake paths (near misses) logically from Level 3 onwards
        if (level >= 3) {
            // Shuffle to create random branches
            for (let i = potentialRemovals.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [potentialRemovals[i], potentialRemovals[j]] = [potentialRemovals[j], potentialRemovals[i]];
            }

            function countSolutions() {
                let solutions = 0;
                let nodesVisited = 0;
                let vis = Array(ROWS).fill(0).map(() => Array(COLS).fill(false));
                
                function solverDfs(r, c, count) {
                    // Abort early if we find a second valid solution or processing time exceeds limits
                    if (solutions >= 2 || nodesVisited > 10000) return;
                    nodesVisited++;
                    vis[r][c] = true;
                    
                    if (r === endCell[0] && c === endCell[1]) {
                        if (count === total) solutions++;
                        vis[r][c] = false;
                        return;
                    }
                    
                    for (let i = 0; i < 4; i++) {
                        const nr = r + dr[i];
                        const nc = c + dc[i];
                        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !vis[nr][nc]) {
                            const edgeToCheck = `${r},${c}-${nr},${nc}`;
                            if (!wallsSet.has(edgeToCheck)) {
                                solverDfs(nr, nc, count + 1);
                            }
                        }
                    }
                    vis[r][c] = false;
                }
                
                solverDfs(startCell[0], startCell[1], 1);
                return { solutions, nodesVisited };
            }

            // More aggressive near misses based on difficulty
            const maxWallsToRemove = level === 3 ? 12 : (level === 4 ? 20 : 35);
            let removedCount = 0;

            for (let rem of potentialRemovals) {
                if (removedCount >= maxWallsToRemove) break;
                
                // Temporarily remove wall
                wallsSet.delete(rem.w1);
                wallsSet.delete(rem.w2);
                
                const res = countSolutions();
                
                if (res.solutions > 1 || res.nodesVisited > 10000) {
                    // Put wall back if it creates multiple real solutions or becomes impossibly nested
                    wallsSet.add(rem.w1);
                    wallsSet.add(rem.w2);
                } else {
                    // Wall removal creates a valid dead end / trap path
                    removedCount++;
                }
            }
        } else {
            // For Level 1 and 2, randomly remove walls more freely since uniqueness isnt as strict (just keep it fun and open)
            for (let rem of potentialRemovals) {
                if (Math.random() < 0.6) {
                    wallsSet.delete(rem.w1);
                    wallsSet.delete(rem.w2);
                }
            }
        }

        // Build final rendering array
        wallsData = [];
        let addedWalls = new Set();
        for (let w of wallsSet) {
            let [p1, p2] = w.split('-');
            let [r1, c1] = p1.split(',').map(Number);
            let [r2, c2] = p2.split(',').map(Number);
            let sortedEdge = r1 < r2 || (r1 === r2 && c1 < c2) ? `${r1},${c1}-${r2},${c2}` : `${r2},${c2}-${r1},${c1}`;
            if (!addedWalls.has(sortedEdge)) {
                addedWalls.add(sortedEdge);
                wallsData.push([[r1, c1], [r2, c2]]);
            }
        }

        buildGridAndWalls();
    }

    // Interactive Logic
    document.addEventListener('mouseup', handleCellUp);
    document.addEventListener('touchend', handleCellUp);
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevent scrolling while dragging puzzle
        const touch = e.touches[0];
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        if (el && el.classList.contains('cell')) {
            const r = parseInt(el.dataset.r);
            const c = parseInt(el.dataset.c);
            if (!isNaN(r) && !isNaN(c)) {
                handleCellDrag(r, c);
            }
        }
    }, { passive: false });

    function handleCellClick(r, c) {
        if (!startCell || !endCell) return;
        
        const vIndex = userPath.findIndex(cell => cell[0] === r && cell[1] === c);
        if (vIndex !== -1) {
            startTimer();
            isDragging = true;
            userPath = userPath.slice(0, vIndex + 1);
            updateUserPathVis();
            return;
        }

        if (r === startCell[0] && c === startCell[1]) {
            startTimer();
            isDragging = true;
            userPath = [[r, c]];
            updateUserPathVis();
        } else if (userPath.length > 0) {
            tryAddUserPath(r, c);
            isDragging = true;
        }
    }

    function handleCellDrag(r, c) {
        if (isDragging) {
            tryAddUserPath(r, c);
        }
    }

    function handleCellUp() {
        if (isDragging) {
            isDragging = false;
            checkSolution();
        }
    }

    function tryAddUserPath(r, c) {
        if (userPath.length === 0) return;
        const lastCell = userPath[userPath.length - 1];
        if (lastCell[0] === r && lastCell[1] === c) return;
        
        const dr = Math.abs(lastCell[0] - r);
        const dc = Math.abs(lastCell[1] - c);
        if (dr + dc !== 1) return;

        if (hasWall(lastCell[0], lastCell[1], r, c)) return;

        const vIndex = userPath.findIndex(cell => cell[0] === r && cell[1] === c);
        if (vIndex !== -1) {
            userPath = userPath.slice(0, vIndex + 1);
            updateUserPathVis();
            return;
        }

        userPath.push([r, c]);
        updateUserPathVis();
        if (r === endCell[0] && c === endCell[1]) {
             isDragging = false;
             checkSolution();
        }
    }

    function updateUserPathVis() {
        document.querySelectorAll('.cell').forEach(c => c.classList.remove('user-visited'));
        
        let d = "";
        userPath.forEach((coord, index) => {
            const cellEl = document.querySelector(`.cell[data-r="${coord[0]}"][data-c="${coord[1]}"]`);
            if (cellEl && !cellEl.classList.contains('start') && !cellEl.classList.contains('end')) {
                cellEl.classList.add('user-visited');
            }

            const center = getCellCenter(coord[0], coord[1]);
            if (index === 0) {
                d += `M ${center.x} ${center.y}`;
            } else {
                d += ` L ${center.x} ${center.y}`;
            }
        });

        const userPathEl = document.getElementById('user-path');
        if (userPathEl) {
            userPathEl.setAttribute("d", d);
        }
    }

    function checkSolution() {
        const msgEl = document.getElementById('status-message');
        if (!msgEl) return;
        if (userPath.length === 0) {
            msgEl.textContent = "";
            return;
        }
        
        const lastCell = userPath[userPath.length - 1];
        if (lastCell[0] === endCell[0] && lastCell[1] === endCell[1]) {
            if (userPath.length === ROWS * COLS) {
                stopTimer();
                const m = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
                const s = (secondsElapsed % 60).toString().padStart(2, '0');
                msgEl.textContent = `Puzzle Solved in ${m}:${s}! Great job! 🎉`;
                msgEl.style.color = "#10b981";
                
                const userPathEl = document.getElementById('user-path');
                if (userPathEl) userPathEl.classList.add('path-solved-pulse');
                
                fireConfetti();
            } else {
                msgEl.textContent = "Failed! Path missed some cells.";
                msgEl.style.color = "#ef4444";
            }
        } else {
            msgEl.textContent = "Keep going...";
            msgEl.style.color = "#3b82f6";
        }
    }

    const btnHint = document.getElementById('btn-hint');
    if (btnHint) {
        btnHint.addEventListener('click', () => {
            startTimer();
            if (pathData.length === 0) {
                pathData = solvePuzzle();
                if (pathData.length === 0) return;
            }

            let matchLen = 0;
            while(matchLen < userPath.length && matchLen < pathData.length) {
                if (userPath[matchLen][0] === pathData[matchLen][0] && userPath[matchLen][1] === pathData[matchLen][1]) {
                    matchLen++;
                } else {
                    break;
                }
            }

            if (matchLen < pathData.length) {
                userPath = pathData.slice(0, matchLen + 1);
            } else {
                userPath = pathData.slice();
            }
            updateUserPathVis();
            checkSolution();
        });
    }

    function fireConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        const colors = ['#10b981', '#3b82f6', '#FFD93D', '#ef4444', '#8b5cf6', '#f472b6'];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                r: Math.random() * 6 + 4,
                dx: Math.random() * 30 - 15,
                dy: Math.random() * -20 - 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.floor(Math.random() * 10) - 10,
                tiltAngleInc: (Math.random() * 0.07) + 0.05,
                tiltAngle: 0
            });
        }

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let active = false;
            
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                p.tiltAngle += p.tiltAngleInc;
                p.y += (Math.cos(p.tiltAngle) + p.dy + p.r / 2) / 2;
                p.x += Math.sin(p.tiltAngle) * 2 + p.dx;
                p.dy += 0.25; // gravity
                
                if (p.y <= canvas.height) active = true;

                ctx.beginPath();
                ctx.lineWidth = p.r;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + p.r, p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
                ctx.stroke();
            }

            if (active) {
                confettiAnimId = requestAnimationFrame(render);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                confettiAnimId = null;
            }
        }
        
        if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
        render();
    }
});
