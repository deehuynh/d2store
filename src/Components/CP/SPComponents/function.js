function powerAddForm () {
    var id = document.getElementById("add-smartphone-form");
    var idXBtn = document.getElementById("cp-btn-x-new-product");
    var idAddBtn = document.getElementById("cp-btn-add-new-product");
    if (id.style.display === 'block') {
      id.style.display = 'none';
      idXBtn.style.display = 'none';
      idAddBtn.style.display = 'block';
    } else {
      id.style.display = 'block';
      idXBtn.style.display = 'block';
      idAddBtn.style.display = 'none';
    }
  }