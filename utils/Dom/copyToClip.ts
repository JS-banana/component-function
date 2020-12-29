/**
 * 复制内容到粘贴板
 * content : 需要复制的内容
 */
function copyToClip(content: any) {
  let aux = document.createElement("input");
  aux.setAttribute("value", content);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  return true;
}
