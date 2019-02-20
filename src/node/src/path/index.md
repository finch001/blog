## path

### basename
- path <string>
- ext <string> 可选 表示文件后缀名
- Returns <string>
path.basename() 返回最后一个路径， 如果ext传入参数返回的结果则会去掉后缀

~~~~~js
path.basename('/foo/bar/baz/asdf/quux.html');
// Returns: 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html')
// Return: 'quux'

~~~~~


### isAbsolute
判断路径是否是绝对路径
~~~~~js
path.isAbsolute('/foo/bar'); // true
path.isAbsolute('/baz/..');  // true
path.isAbsolute('qux/');     // false
path.isAbsolute('.');        // false
~~~~~

### join
- ...paths
- Returns: <string>
  
1. 首先使用平台特定的文件分隔符连接路径片段，然后调用` normalize（） ` 作为返回的结果
2. 如果paths为空，则直接返回 `.`
### normalize
- path <string>
- Returns: <string>

1. path.normalize() 主要用来处理 ` '.'  '..'`路径分隔符
2. 如果paths为空，则直接返回 `.`

~~~~~~js
path.normalize('/foo/bar//baz/asdf/quux/..');
// Returns: '/foo/bar/baz/asdf'

path.normalize('C:\\temp\\\\foo\\bar\\..\\');
// Returns: 'C:\\temp\\foo\\'

path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar');
// Returns: 'C:\\temp\\foo\\bar'
~~~~~~

### resolve
- ...paths
- Returns: <string>
  
path.resolve() 方法处理一系列路径片段 组成一个绝对路径。

1. 路径片段处理是从右向左依次处理的，直到第一个绝对路径出现结束。
2. 如果所有的路径片段都已经处理了但是绝对路径还是没有生成，就会在前面加上当前的工作路径。
3. 零长度的路径片段会被忽略。
4. 如果没有路径片段传入， path.resolve将返回当前的工作路径。

~~~~~~~js
    path.resolve('/foo/bar', './baz') // returns: '/foo/bar/baz'

    path.resolve('/foo/bar', '/tmp/file/') // returns: '/tmp/file'

    path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
    // if the current working directory is /home/myself/node
    // this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'

~~~~~~~