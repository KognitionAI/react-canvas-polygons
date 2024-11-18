import Tool from './tool';
export const LINE = 'Line';

const line = { ...Tool };

line.name = 'Line';

line.onMouseDown = function onMouseDown(start, options) {
    this.ctx.strokeStyle = options ? options.color : "#000";
    this.setInitSettings({ start, options });
    if (!this.state.data) {
        // get the start point on mouse down
        // TODO: it is not the best solution
        // revisit later
        this.state.firstMouseDown = start;
        this.state.data = [];
    }
}

line.onMouseMove = function onMouseMove(position) {
    if (!this.state || !this.state.started) return;
    this.ctx.putImageData(this.imageData, 0, 0);
    this.draw(this.state.start, position);
}

// see #3
// Change mechanism to draw line
line.onMouseUp = function onMouseUp(position, callback) {
    if (!this.state) return;
    // NOTE: This state data is just to avoid draw in
    // the first mouse up
    this.state.data.push([position.x, position.y]);
    if (this.state.data.length > 1) {
        const data = [[this.state.firstMouseDown.x, this.state.firstMouseDown.y], [position.x, position.y]];
        const start = this.state.start;
        const options = this.state.options;
        this.drawCrossDirection(this.state.data, 10);
        this.resetState();
        callback();
        return {
            data: data,
            canvas: {
                start,
                end: position,
                options
            }
        };
    }
}

function getCrossPath(point, size, direction) {
    const path = new Path2D();
    const startHorizontalLine = { x: point.x - size, y: point.y };
    const endHorizontalLine = { x: point.x + size, y: point.y };
    const startVerticalLine = { x: point.x, y: point.y - size };
    const endVerticalLine = { x: point.x, y: point.y + size };

    path.moveTo(startHorizontalLine.x, startHorizontalLine.y);
    path.lineTo(endHorizontalLine.x, endHorizontalLine.y);
    path.moveTo(startVerticalLine.x, startVerticalLine.y);
    path.lineTo(endVerticalLine.x, endVerticalLine.y);
    return path;
}

/* Xt = (X1+X2)/2 + M * sign(Y2-Y1)
Yt = (Y1+Y2)/2 - M * sign(X2-X1) */
line.drawCrossDirection = function (points, pixelDistance) {
    const x1 = points[0][0];
    const x2 = points[1][0];
    const y1 = points[0][1];
    const y2 = points[1][1];

    // Calculate perpendicular angle (90 degrees = PI/2)
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const perpAngle = angle + Math.PI / 2;
    const arrowLength = 10;
    const arrowWidth = Math.PI / 6; // 30 degrees
    const labelOffset = 12; // Reduced from 15 to bring labels even closer
    const lineLength = 20;

    // Draw "enter" arrow at start point (pointing down)
    const enterPath = new Path2D();
    const enterX = x1  + lineLength * Math.cos(perpAngle);
    const enterY = y1 + lineLength * Math.sin(perpAngle);
    
    // Draw enter arrow line
    enterPath.moveTo(x1, y1);
    enterPath.lineTo(enterX, enterY);

    // Draw enter arrowhead as filled triangle
    const enterArrow = new Path2D();
    enterArrow.moveTo(enterX + 5 * Math.cos(perpAngle), enterY + 5 * Math.sin(perpAngle));
    enterArrow.lineTo(
        enterX - arrowLength * Math.cos(perpAngle - arrowWidth) + 5 * Math.cos(perpAngle),
        enterY - arrowLength * Math.sin(perpAngle - arrowWidth) + 5 * Math.sin(perpAngle)
    );
    enterArrow.lineTo(
        enterX - arrowLength * Math.cos(perpAngle + arrowWidth) + 5 * Math.cos(perpAngle),
        enterY - arrowLength * Math.sin(perpAngle + arrowWidth) + 5 * Math.sin(perpAngle)
    );
    enterArrow.closePath();

    // Draw "exit" arrow at end point (pointing up)
    const exitPath = new Path2D();
    const exitX = x2 - lineLength * Math.cos(perpAngle);
    const exitY = y2 - lineLength * Math.sin(perpAngle);
    
    // Draw exit arrow line
    exitPath.moveTo(x2, y2);
    exitPath.lineTo(exitX, exitY);

    // Draw exit arrowhead as filled triangle
    const exitArrow = new Path2D();
    exitArrow.moveTo(exitX - 5 * Math.cos(perpAngle), exitY - 5 * Math.sin(perpAngle));
    exitArrow.lineTo(
        exitX + arrowLength * Math.cos(perpAngle - arrowWidth) - 5 * Math.cos(perpAngle),
        exitY + arrowLength * Math.sin(perpAngle - arrowWidth) - 5 * Math.sin(perpAngle)
    );
    exitArrow.lineTo(
        exitX + arrowLength * Math.cos(perpAngle + arrowWidth) - 5 * Math.cos(perpAngle),
        exitY + arrowLength * Math.sin(perpAngle + arrowWidth) - 5 * Math.sin(perpAngle)
    );
    exitArrow.closePath();

    // Draw arrow lines separately
    this.ctx.stroke(enterPath);
    this.ctx.stroke(exitPath);

    // Fill enter arrowhead (green)
    this.ctx.fillStyle = '#008000'; // Green
    this.ctx.fill(enterArrow);

    // Fill exit arrowhead (red)
    this.ctx.fillStyle = '#FF0000'; // Red
    this.ctx.fill(exitArrow);

    // Add labels
    this.ctx.font = '12px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#000'; // Keep text black
    
    // Position labels perpendicular to arrows
    this.ctx.fillText('enter', 
        enterX + (labelOffset + 5) * Math.cos(perpAngle),
        enterY + (labelOffset + 5) * Math.sin(perpAngle)
    );
    this.ctx.fillText('exit',
        exitX - labelOffset * Math.cos(perpAngle),
        exitY - labelOffset * Math.sin(perpAngle)
    );
}

export default line;
