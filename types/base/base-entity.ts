export interface BaseEntity {
  idBase?: string;
  name: string;
  price: number;
  count: number;
  seedId: string;
}
// export interface NewAdEntity extends Omit<BaseEntity, 'id'> {
//   id? : string;
// }
//
// export interface SimpleAdEntity { //to co wysyłam na frontend podczas wyszukiwania w metodzie .findAll
//   id: string;
//   lat: number;
//   lon: number;
// }
//
// export interface BaseEntity extends SimpleAdEntity { //zawiera pełen obiekt z wszystkimi danymi
//   name: string;
//   description: string;
//   price: number;
//   url: string;
// }