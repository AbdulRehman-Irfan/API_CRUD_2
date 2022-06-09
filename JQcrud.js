$(function () {
  LoadMobile();
  $("#mobiles").on("click", ".btn-danger", DeleteMobile);
  $("#mobiles").on("click", ".btn-warning", EditProduct);
  $(".newButton").click(newMobile);
  $("#addMobile").click(function () {
    $("#newMobileModel").modal("show");
  });
  $(".updateButton").click(updateProduct);
});
function updateProduct() {
  var id = $("#updateID").val();
  var name = $("#updateName").val();
  var price = $("#updatePrice").val();
  var RAM = $("#updatedRAM").val();
  var ROM = $("#updatedROM").val();
  $.ajax({
    url: "https://api-ass-2-sh.herokuapp.com/api/mobiles/" + id,
    method: "PUT",
    data: { name, price, RAM, ROM },
    error: function () {
      console.log("Eror");
    },
    success: function () {
      $("#updateModel").modal("hide");
      LoadMobile();
    },
  });
}
function EditProduct() {
  var id = $(this).closest(".mobile").attr("data-id");
  $.get(
    "https://api-ass-2-sh.herokuapp.com/api/mobiles/" + id,
    function (response) {
      $("#updateID").val(response._id);
      $("#updateName").val(response.name);
      $("#updatePrice").val(response.price);
      $("#updatedRAM").val(response.RAM);
      $("#updatedROM").val(response.ROM);
      $("#updateModel").modal("show");
    }
  );
}
function DeleteMobile() {
  var id = $(this).closest(".mobile").attr("data-id");
  $.ajax({
    url: "https://api-ass-2-sh.herokuapp.com/api/mobiles/" + id,
    method: "DELETE",
    success: function () {
      LoadMobile();
    },
  });
}
function LoadMobile() {
  $.ajax({
    url: "https://api-ass-2-sh.herokuapp.com/api/mobiles",
    method: "GET",
    success: function (response) {
      console.log(response);
      var mobiles = $("#mobiles");
      mobiles.empty();
      for (var i = 0; i < response.length; i++) {
        var mobile = response[i];
        mobiles.append(`<div class="mobile card  col-lg-3 col-md-5 m-3" data-id="${mobile._id}">
                <img class="card-img-top" src="./b.png" alt="">
                <div class="card-body">
                    <h5 class="card-title">${mobile.name}</h5>
                    <p class="card-text font-weight-bold">Price: ${mobile.price}$</p>
                    <p class="card-text font-weight-bold">Color: ${mobile.RAM}</p>
                    <p class="card-text font-weight-bold">Category: ${mobile.ROM}</p>
                    <button type="button" class="btn btn-warning px-4">Update</button>
                    <button type="button" class="btn btn-danger px-3">Delete</button>
                </div>
            </div>`);
      }
    },
  });
}
function newMobile() {
  var name = $("#newName").val();
  var price = $("#newPrice").val();
  var RAM = $("#newRAM").val();
  var ROM = $("#newROM").val();
  $.ajax({
    url: "https://api-ass-2-sh.herokuapp.com/api/mobiles/",
    method: "POST",
    data: { name, price, RAM, ROM },
    error: function () {
      console.log("Eror");
    },
    success: function () {
      $("#newMobileModel").modal("hide");
      LoadMobile();
    },
  });
}
