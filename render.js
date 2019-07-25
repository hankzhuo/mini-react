// 定义一个类似于 React element 的 element
const element = {
  type: 'div',
  props: {
    id: 'container',
    children: [
      { type: 'input', props: { value: 'foo', type: 'text' } },
      { type: 'a', props: { href: '/bar' } },
      { type: "span", props: {} }
    ]
  }
}

const textElement = {
  type: "span",
  props: {
    children: [
      {
        type: "TEXT ELEMENT",
        props: { nodeValue: "Foo" }
      }
    ]
  }
}

// 渲染 DOM Elements
function render(element, parentDom) {
  const { type, props } = element

  // 创建 DOM element，判断是否是 textNode
  const isTextElement = type === 'TEXT ELEMENT'
  const dom = isTextElement 
    ? document.createTextNode(type) 
    : document.createElement(type)

  // 添加事件监听
  const isListener = name => name.startsWith("on");
  Object.keys(props).filter(isListener).forEach(name => {
    const eventType = name.toLowerCase().substring(2);
    dom.addEventListener(eventType, props[name]);
  });

  // 添加属性
  const isAttribute = name => !isListener(name) && name != "children";
  Object.keys(props).filter(isAttribute).forEach(name => {
    dom[name] = props[name];
  });

  const childElements = props.children || []
  childElements.forEach(childElement => render(childElement, dom))
  parentDom.appendChild(dom)
}

