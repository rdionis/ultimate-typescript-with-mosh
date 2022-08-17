



export default class SpecialStore { }
// the 'export default' indicates that this is the default object exported from this module
// when importing it somewhere else, we no longer need the {}



export enum Format { Raw, Compressed}

// we do not want to import these classes, since they are just an implementation detail
class Compressor { }
class Encryptor { }