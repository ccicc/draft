// 获取实体
const getEntities = (editorState, entityType = null) => {
  const contentState = editorState.getCurrentContent();
  const entities = [];
  contentState.getBlocksAsArray().forEach(block => {
    let selectedEntity = null;
    block.findEntityRanges(
      (character) => {
        if (character.getEntity() !== null) {
          const entity = contentState.getEntity(character.getEntity());
          if (!entityType || (entityType && entity.getType() === entityType)) {
            selectedEntity = {
              entityKey: character.getEntity(),
              blockKey: block.getKey(),
              entity: contentState.getEntity(character.getEntity())
            };
            return true;
          }
        }
        return false;
      },
      (start, end) => entities.push({ ...selectedEntity, start, end })
    );
  });
  return entities;
};

export default getEntities;
