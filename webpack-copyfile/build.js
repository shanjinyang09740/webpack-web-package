const fs = require("fs");

const path = require("path");

const resolve = (dir) => path.join(__dirname, dir);

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
    fs.access(dist, function(err) {
        if (err) {
            // 目录不存在时创建目录
            fs.mkdirSync(dist);
        }
        _copy(null, src, dist);
    });

    function _copy(err, src, dist) {
        if (err) {
            callback && callback(err);
        } else {
            try {
                let paths = fs.readdirSync(src);
                paths.forEach(function(path) {
                    var _src = src + "/" + path;
                    var _dist = dist + "/" + path;
                    let stat = fs.statSync(_src);
                    // 判断是文件还是目录
                    if (stat.isFile()) {
                        fs.copyFileSync(_src, _dist);
                    } else if (stat.isDirectory()) {
                        // 当是目录是，递归复制
                        copyDir(_src, _dist, callback);
                    }
                });
            } catch (error) {
                callback && callback(error);
            }
        }
    }
}

function deleteFolder(filePath) {
    const files = [];
    if (fs.existsSync(filePath)) {
        const files = fs.readdirSync(filePath);
        files.forEach((file) => {
            const nextFilePath = `${filePath}/${file}`;
            const states = fs.statSync(nextFilePath);
            if (states.isDirectory()) {
                deleteFolder(nextFilePath);
            } else {
                fs.unlinkSync(nextFilePath);
            }
        });
        fs.rmdirSync(filePath);
    }
}

let sourcePath = resolve("./src");
let targetPath = resolve("./build");

deleteFolder(targetPath);

fs.mkdirSync(targetPath);

copyDir(sourcePath, targetPath);