### 定理块\* [^extra]

```[theorem,t1,定理名称]
这是定理的内容。
```

其中`theorem`是定理块的类型关键字, `t1`是该定理块的id, 你可以用 `[~id]` 来引用 [~t1]

```[theorem,t1,自动编号]
自动根据定理块的类型进行编号。
```

### 解答或证明\*

点击三角可以展开或者隐藏证明内容.

~~~[solution]
详解.
~~~

~~~[proof]
证明的具体内容.
~~~

### 数学公式\*

这是两个内联公式, $\sin^2 (1^{\circ}) + \cos^2 (1^{\circ}) = 1$ 和 \(x\).

下面两个是块公式

$$
\begin{pmatrix}
1 & a_1 & a_1^2 & \cdots & a_1^n \\
1 & a_2 & a_2^2 & \cdots & a_2^n \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & a_m & a_m^2 & \cdots & a_m^n \\
\end{pmatrix}
$$

\[
\sin^2 (1^{\circ}) + \cdots + \sin^2 (89^{\circ}) + \sin^2 (90^{\circ})= 45.5
\]
