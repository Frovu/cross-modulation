const vertexShaderSource = `
attribute vec4 a_position;
void main() {
	gl_Position = a_position;
}`;
const fragmentShaderSource = `
precision mediump float;
void main() {
	gl_FragColor = vec4(0, 1, 1, 1);
}`;

function init() {
	const canvas = document.querySelector('#main');
	const gl = canvas.getContext('webgl');

	const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
	const program = linkProgram(gl, vertexShader, fragmentShader);

	const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
	const positionBuffer = gl.createBuffer();


	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	function render() {
		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.useProgram(program);
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

		const size = 2;
		const type = gl.FLOAT;
		const normalize = false;
		const stride = 0;
		const offset = 0;
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

		const primitiveType = gl.TRIANGLES;
		const arrOffset = 0;
		const count = 3;
		gl.drawArrays(primitiveType, arrOffset, count);
	}
	setInterval(() => {
		const positions = [];
		for (let i=0; i<6; ++i)
			positions[i] = Math.random() * 2 - 1;
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW);

		render();
	}, 10);
}


function compileShader(gl, type, src) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, src);
	gl.compileShader(shader);
	if (gl.getShaderParameter(shader, gl.COMPILE_STATUS))
		return shader;
	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}

function linkProgram(gl, vertexShader, fragmentShader) {
	const program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (gl.getProgramParameter(program, gl.LINK_STATUS))
		return program;
	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
}

init();
