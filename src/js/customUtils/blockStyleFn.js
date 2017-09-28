export default function blockStyleFn(contentBlock) {
  const blockAlignment = contentBlock.getData().get('text-align');
  const blockListStyle = contentBlock.getData().get('list-style-type');
  if (blockAlignment) {
    return `custom-${blockAlignment}-aligned-block`;
  }
  if (blockListStyle) {
    return `custom-${blockListStyle}-list-block`;
  }
}
