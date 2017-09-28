export default function blockStyleFn(contentBlock) {
  const blockAlignment = contentBlock.getData().get('text-align');
  if (blockAlignment) {
    return `custom-${blockAlignment}-aligned-block`;
  }
}
