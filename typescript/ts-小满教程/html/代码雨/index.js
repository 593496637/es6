const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = screen.availHeight;
canvas.height = screen.availWidth;
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let strArr = Array(Math.ceil(canvas.width / 10)).fill(0);
const rain = () => {
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    strArr.forEach((item, index) => {
        // txt是随机的字母或数字
        let txt = str[Math.floor(Math.random() * str.length)];
        // fillText(文本, x, y): x是字体的x坐标，y是字体的y坐标
        ctx.fillText(txt, index * 10, item);
        // 如果item大于canvas的高度或者大于随机数*20000，就让item等于0，否则item+10
        strArr[index] =
            item > canvas.height || item > Math.random() * 20000 ? 0 : item + 10;
    });
};
setInterval(rain, 1000 / 60);
