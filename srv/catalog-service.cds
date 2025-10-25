using { northwind.db as nw } from '../db/schema';

service CatalogService {

    entity Categories as projection on nw.Categories;

    entity Products as projection on nw.Products;

    entity Customers as projection on nw.Customers;

    entity Orders as projection on nw.Orders;

    entity Order_Details as projection on nw.Order_Details;
}
