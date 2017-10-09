/* eslint-disable */ 

import ImageComponent from './Image';

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
    }
  }
  return undefined;
}

export default getBlockRenderFunc;
