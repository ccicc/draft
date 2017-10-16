import ImageComponent from './Image';
import PageBreakComponent from './PageBreak';

const getBlockRenderFunc = (options) => (contentBlock) => {
  const type = contentBlock.getType();

  if (type === 'atomic') {
    const contentState = options.getEditorState().getCurrentContent();
    const entity = contentState.getEntity(contentBlock.getEntityAt(0));
    if (entity && entity.getType() === 'IMAGE') {
      return {
        component: ImageComponent,
        editable: false,
        props: {
          options
        }
      };
    } else if (entity && entity.getType() === 'PAGEBREAK') {
      return {
        component: PageBreakComponent,
        editable: false
      };
    }
  }
  return undefined;
};

export default getBlockRenderFunc;
