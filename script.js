//fetch backend api data http://localhost/api/fetchall.php
 document.addEventListener("DOMContentLoaded", function(){
    loadtable();
});
//  fetchData();
let tableBody = document.querySelector("#tableBody");
// console.log(tableBody);

function loadtable(){
fetch("http://localhost/api/fetchall.php")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    tableBody.innerHTML = "";

    data.forEach((student) => {
      tableBody.innerHTML += `

<tr id="row-${student.id}">
<td>${student.id}</td>
<td>${student.studentname}</td>
<td>${student.age}</td>
<td>${student.city}</td>

<td>
 <button class="btn btn-sm btn-primary"
onclick="editStudent(${student.id})">
Edit
</button>
</td>

 <td>
<button class="btn btn-sm btn-danger"
onclick="deleteStudent(${student.id})">
 Delete
</button>
</td>


</tr>
`;
    });
  })
  .catch((error) => {
    tableBody.innerHTML = `
            <tr>
                <td colspan="4"> ${error}Error loading data</td>
            </tr>
        `;
  });
}

// read data from api works ends here

// insert data using api fetch method

var myform=document.querySelector('#studentForm');
myform.addEventListener('submit',function(e){
    e.preventDefault(); //stop default form submit 

const studentname=myform.querySelector('input[type="text"]').value;
const studentage=myform.querySelector('input[type="number"]').value;
const studentcity=myform.querySelectorAll('input[type="text"]')[1].value;

// prepare for data for sending
const data={
    studentname:studentname,
    age:studentage,
    city:studentcity
};



fetch("http://localhost/api/fetchinsert.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response => {
            if(response.status === "success"){
                alert(response.message);
                myform.reset(); // clear form
            } else {
                alert("Error: " + response.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error inserting student");
        });
    });







    // delete button works 
    function deleteStudent(id) {
    if(!confirm("Are you sure you want to delete this record?")) return;

    fetch("http://localhost/api/fetchdel.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: id})
    })
    .then(res => res.json())
    .then(response => {
        if(response.status === "success"){
            alert(response.message);
            // Remove row from table without refresh
            const row = document.querySelector(`#row-${id}`);
            if(row) row.remove();
        } else {
            alert("Error: " + response.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error deleting student");
    });
}

// edit data 
function editStudent(id){
    // Find the student row in table
    const row = document.querySelector(`#row-${id}`);
    if(!row) return;

    const cells = row.querySelectorAll('td');
    const name = cells[1].innerText;
    const age = cells[2].innerText;
    const city = cells[3].innerText;

    // Fill modal form fields
    document.getElementById('editId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editAge').value = age;
    document.getElementById('editCity').value = city;

    // Show modal
    let editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}


/////////////////////
// Update student data
// Update student data
document.getElementById('editForm').addEventListener('submit', function(e){
    e.preventDefault();

    const id = document.getElementById('editId').value;
    const studentname = document.getElementById('editName').value;
    const age = document.getElementById('editAge').value;
    const city = document.getElementById('editCity').value;

    const data = { id, studentname, age, city };

    fetch("http://localhost/api/fetchupdate.php", {
        method: "POST", // use POST instead of PUT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        if(response.status === "success"){
            alert(response.message);

            // Close modal
            const editModalEl = document.getElementById('editModal');
            const modal = bootstrap.Modal.getInstance(editModalEl);
            modal.hide();

            // Reload table data
            loadtable();
        } else {
            alert(response.message);
        }
    })
    .catch(err => {
        console.error(err);
        alert("Error updating student");
    });
});
