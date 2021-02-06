const isPlainObject = o => typeof o === 'object' && o.constructor === Object;
const isEmpty = o => !Object.keys(o).length;
const isEmptyObject = o => isPlainObject(o) && isEmpty(o);

export default isEmptyObject;

// isEmptyObject, isDuplicatedId 파일이 분리되어 있지 않은 경우
// export { isEmptyObject, isDuplicatedId };