function MenuChoice(){
      if (document.getElementById("menu").value == "Customer List")     {
            document.getElementById("section1").style.display = "block";
            document.getElementById("section2").style.display = "none";
            document.getElementById("section3").style.display = "none";
            }
        
      else if (document.getElementById("menu").value == "Customer Order History"){
            document.getElementById("section1").style.display = "none";
            document.getElementById("section2").style.display = "block";
            document.getElementById("section3").style.display = "none";
        }
        
      else if (document.getElementById("menu").value == "Orders Made"){
            document.getElementById("section1").style.display = "none";
            document.getElementById("section2").style.display = "none";
            document.getElementById("section3").style.display = "block";
        }
        
        else     {
            document.getElementById("section1").style.display = "none";
            document.getElementById("section2").style.display = "none";
            document.getElementById("section3").style.display = "none";
        }
}

function CustomerList(){
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/GetAllCustomers";
      
      objRequest.onreadystatechange = function(){
            if(objRequest.readyState == 4 && objRequest.status == 200){
                  var output = JSON.parse(objRequest.responseText);
                  GenerateList(output);
            }
      }
      objRequest.open("GET", url, true);
      objRequest.send();
}

function GenerateList(result){
      var count = 0;
      var displaytext = "<table><tr><th>Customer ID</th><th>Customer Name</th><th>Customer City</th></tr>";
      
      for(count = 0; count < result.GetAllCustomersResult.length; count++){
            displaytext += "<tr><td>" + result.GetAllCustomersResult[count].CustomerID + "</td><td>" + result.GetAllCustomersResult[count].CompanyName + "</td><td>"+ result.GetAllCustomersResult[count].City+"</td></tr>";  
      }
      displaytext += "</table>";
      document.getElementById("customerlist").innerHTML = displaytext;
}

function GetHistory(){
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
      url += document.getElementById("custid1").value;
      
      objRequest.onreadystatechange = function(){
            if(objRequest.readyState == 4 && objRequest.status == 200){
                  var output = JSON.parse(objRequest.responseText);
                  GenerateHistory(output);
            }
      }
      //Initiate the server request
      objRequest.open("GET", url, true);
      objRequest.send();
      }

function GenerateHistory(result){
      var count = 0;
      var displaytext = "<table><tr><th>Product Name</th><th>Total Product Qauntity Ordered</th></tr>";
      
      for(count = 0; count < result.length; count++){
            displaytext += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";  
      }
      displaytext += "</table>";
      document.getElementById("historydisplay").innerHTML = displaytext;
}


function GetOrders(){
      var objRequest = new XMLHttpRequest();
      
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
      url += document.getElementById("custid2").value;
      
      //Checks that the object has returned data
      objRequest.onreadystatechange = function(){
            if(objRequest.readyState == 4 && objRequest.status == 200){
                  var output = JSON.parse(objRequest.responseText);
                  GenerateOrders(output);
            }
      }
      
      //Initiate the server request
      objRequest.open("GET", url, true);
      objRequest.send();     
}

function GenerateOrders(result){ 
      var count = 0;
      var displaytext = "<table><tr><th>Order Date</th><th>Order ID</th><th>Ship Address</th><th>Ship City</th><th>Ship Name</th><th>Shipe Post Code</th><th>Shipped Date</th></tr>";
      
      for(count = 0; count < result.GetOrdersForCustomerResult.length; count++){
            displaytext += "<tr><td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td></tr>";
            //This line above is really ugly, other than that, table seems fine.
      }
      displaytext += "</table>";
      document.getElementById("orderdisplay").innerHTML = displaytext;
}





