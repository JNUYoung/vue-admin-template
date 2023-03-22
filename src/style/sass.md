1.sass允许定义可重复使用的变量

 sass通过$符来标明变量，任何用作css的属性值都可以被用作sass变量的值

sass的变量也具有块级作用域，只能在其被定义的块内使用。块外无法使用块内定义的变量



2.sass嵌套css规则

为了解决书写css规则时经常需要重复书写繁琐的选择器的问题。

sass可以只写一遍选择器，通过花括号来表示选择器之间的层级关系，使得样式可读性更高，代码更加简洁。

2.1 父选择器标识符&

2.2 群组选择器嵌套

```css
.container h1, .container h2, .container h3 {}

/* sass */
.container {
    h1, h2, h3 {}
}
```

2.3 子组合选择器和同层组合选择器

2.4 sass中不仅选择器可以嵌套，属性也可以嵌套

```css
nav {
  border: {
    style: solid,
    color: red,
    width: 1px
  }
}
```


3.导入sass文件

在css中通过@import导入其它css文件时，只有当解析到改行代码时，才会去下载引入的外部css文件，可能导致页面加载速度变慢。

在sass中同样通过@import导入其他sass文件，但是在从sass生成css文件时，就已经把所有文件导入并归纳到同一个css文件中了。


4.静默注释

sass提供了不同于css标准注释格式的注释语法，即“静默注释”，sass中的注释内容不会出现在生成的css文件中。

```css
body {
  width: 800px;  // 静默注释，不会出现在生成的css文件中
  height: 1000px;  /* 普通css注释，会出现在生成的css文件中 */
}
```


5.混合

当项目中有几处小的地方需要相同样式时，使用变量可以很好地进行管理。

但是，如果需要“复用很多的样式 或者 复用大段样式”，则可以通过sass的混合器实现复用。

```scss
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

div {
  @include rounded-corners;
}

// @mixin 标识符可以为一大段样式指定一个名字，后续可以通过@include使用该混合样式
// 如上所示，@include rounded-corners就可以轻松复用花括号中的样式
```

5.1 何时使用混合器

* 当发现在不停地重复一段样式时，尤其是这段样式本身就是一个逻辑单元，比如说是一组放在一起有意义的属性；
* 一条经验法则：“如果能够为标识一段样式的混合器想出一个很好的名字，那么它就应当是一个混合器”

5.3 向混合器传参（类似于函数）

```scss
@mixin link-color($normal, $hover, $active) {
  color: $normal;
  &:hover: $hover;
  &:active: $active;
}

// 使用
a {
  @include link-color(red, green, blue)
}
```


6.使用选择器继承来精简css

理解：一个选择器可以继承另一个选择器内定义的所有样式。

使用方法：@extend 选择器
