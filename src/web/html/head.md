### head中的标签页

head标签，head标签页本身并不携带任何信息，它主要是作为盛放其他语义类标签的容器使用。

head标签规定了自身必须是html标签中的第一个标签，它的内容必须包含一个title，并且最多只能包含一个base。

### title标签
title标签 作为元信息，可能被用在浏览器收藏夹, 微信推送卡片中，title应该是完整概括整个网页内容的。

### meta标签
meta标签是组键值对，它是一种通用的元信息表示标签。
meta标签是由 name 和content两个属性来定义。
~~~~html
 <!-- These meta tags are recognised by Google -->
  <meta name="description" content="Page description.">
  <meta name="robots" content="robots.txt">
~~~~

### 具有charset属性的meta
从HTML5开始，为了简化，新增了charset属性，表示编码格式
~~~~~html
<meta charset="UTF-8">
~~~~~

### 具有 http-equiv属性的Meta
表示执行一个命令，这样的Meta表示不需要name,这样浏览器
~~~~~html
<meta http-equiv="content-type" content="text/html"; charse="UTF-8">
~~~~~

### name为viewport的meta
它没有在HTML标准中定义，但是却是移动端开发的事实标准： 它就是name为viewport的meta，它的content是一个复杂结构，是用逗号分隔的键值对。
~~~~~html
<meta name="viewport" content="width=500, initial-sacle=1">
~~~~~
- width 页面宽度
- height 页面高度
- initial-scale 初始缩放比例
- minimum-scale 最小缩放比例
- maximum-scale 最大缩放比例
- user-scalable 是否允许用户缩放

### 其他的meta
- author
- description
- keywords


## 总结
- head
  - title 标签
  - base 页面的基准URL  一般不要使用
  - meta 元信息永通标签

附上一般的head 标签数据

~~~~~html
<head>

  <!-- Place these first -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Page title (mandatory) -->
  <title></title>

  <!-- These meta tags are recognised by Google -->
  <meta name="description" content="Page description.">
  <meta name="robots" content="robots.txt">

  <!-- Site styles and authors -->
  <link href="style.css" rel="stylesheet">
  <link href="humans.txt" rel="author">

  <!-- HTML5 shim for older version of IE -->
  <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
  <![endif]-->

  <!-- Favicon -->
  <!-- For IE 10 and below just place a file called favicon.ico in the root directory -->
  <link href="/apple-touch-icon-57x57.png" rel="apple-touch-icon" sizes="57x57">
  <link href="/apple-touch-icon-60x60.png" rel="apple-touch-icon" sizes="60x60">
  <link href="/apple-touch-icon-72x72.png" rel="apple-touch-icon" sizes="72x72">
  <link href="/apple-touch-icon-76x76.png" rel="apple-touch-icon" sizes="76x76">
  <link href="/apple-touch-icon-114x114.png" rel="apple-touch-icon" sizes="114x114">
  <link href="/apple-touch-icon-120x120.png" rel="apple-touch-icon" sizes="120x120">
  <link href="/apple-touch-icon-144x144.png" rel="apple-touch-icon" sizes="144x144">
  <link href="/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152">
  <link href="/apple-touch-icon-180x180.png" rel="apple-touch-icon" sizes="180x180">
  <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16">
  <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32">
  <link href="/favicon-48x48.png" rel="icon" type="image/png" sizes="48x48">
  <link href="/favicon-64x64.png" rel="icon" type="image/png" sizes="64x64">
  <link href="/favicon-96x96.png" rel="icon" type="image/png" sizes="96x96">
  <link href="/android-chrome-192x192.png" rel="icon" type="image/png" sizes="192x192">
  <link href="/safari-pinned-tab.svg" rel="mask-icon" color="#000000">
  <meta name="msapplication-TileColor" content="#000000">
  <meta name="msapplication-TileImage" content="/mstile-144x144.png">
  <meta name="theme-color" content="#ffffff">

  <!-- Open Graph protocol  -->
  <meta property="og:title" content="Content Title">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://example.com/image.jpg">
  <meta property="og:url" content="https://example.com/page.html">
  <meta property="og:description" content="Description">
  <meta property="og:site_name" content="Site name">
  <meta property="og:locale" content="en_US">
  <meta property="article:author" content="Author name">

  <!-- Scripts should be loaded asynchronously or deferred -->
  <script src="js/main.js" async></script>
  
</head> 
~~~~~

