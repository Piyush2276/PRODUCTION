namespace northwind.db;

using {northwind_Api_Service} from '../srv/external/northwind-Api-Service';

@requires: 'Viewer'
entity Categories as
    projection on northwind_Api_Service.Categories {
        key CategoryID,
        CategoryName,
        Description,
        Products : Association to many Products
            on Products.CategoryID = $self.CategoryID
    }

entity Products as
    projection on northwind_Api_Service.Products{
        key ProductID,
        ProductName,
        CategoryID,

        Category : Association to one Categories
            on Category.CategoryID = CategoryID,
        
        Order_Details : Association to many Order_Details
            on Order_Details.ProductID = $self.ProductID

    }

@requires: 'Admin'
entity Customers as
    projection on northwind_Api_Service.Customers {
        CustomerID,
        CompanyName,
        Address,
        Phone,
        Orders : Association to many Orders
            on Orders.CustomerID = $self.CustomerID

    }

entity Order_Details as 
    projection on northwind_Api_Service.Order_Details{
        key OrderID,
        ProductID,
        UnitPrice,
        Quantity,

        Order : Association to one Orders
            on Order.OrderID = OrderID,

        Product : Association to one Products
            on Product.ProductID = ProductID
    }

entity Orders as 
    projection on northwind_Api_Service.Orders{
        key OrderID,
        CustomerID,
        OrderDate,

        Customer : Association to one Customers
            on Customer.CustomerID = CustomerID
    }