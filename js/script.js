// Initializing Local Objects
let notes_obj = new Object;
let imp_notes_obj = new Object;


// Initializing Local Storage
if(localStorage.getItem('imp_notes') == null)
{
    localStorage.setItem('imp_notes',JSON.stringify({}));
}

if(localStorage.getItem('notes') == null)
{
    localStorage.setItem('notes',JSON.stringify({}));
}

//Initializing Show Notes
window.addEventListener('load',show_notes);



// Show Notes Function
function show_notes()
{
    // reading notes 
    let notes = localStorage.getItem('notes');
    notes_obj = JSON.parse(notes);

    // reading important notes
    let imp_notes = localStorage.getItem('imp_notes');
    imp_notes_obj = JSON.parse(imp_notes);

    let html='';
    for(let key in notes_obj)
    {
        if(imp_notes_obj[key]==true)
        {
            // Important note template
            html +=`
            <div class="card border-success text-success note_card my-3 mx-2 position-relative border-2" style="width: 16.5rem;">
            <span class="position-absolute top-0 end-0 badge bg-success">
            Important
            </span>
               <div class="card-body" style="position:relative;">
                 <h5 class="card-title">${key}</h5>
                  <p class="card-text mb-2">${notes_obj[key]}</p>
                  <br><br>
                  <div style= 'position:absolute; bottom:1rem;'>
                  <button onclick="delete_note('${key}')" class="btn btn-primary">Delete</button>
                  <button class="btn btn btn-success" onclick="toggle_important('${key}')" >Important</button>
                  </div>
               </div>
            </div>
            `;
        }
        else
        {
            // Normal note template
            html += `
                <div class="card note_card my-3 mx-2" style="width: 16.5rem;">
                   <div class="card-body" style="position:relative;">
                     <h5 class="card-title">${key}</h5>
                      <p class="card-text mb-2">${notes_obj[key]}</p>
                      <br><br>
                      <div style= 'position:absolute; bottom:1rem;'>
                      <button onclick="delete_note('${key}')" class="btn btn-primary">Delete</button>
                      <button class="btn btn-outline-success" onclick="toggle_important('${key}')">Important</button>
                      </div>
                   </div>
                </div>
            `;
        }

    }
            
    let notes_elem = document.getElementById('notes_elem');

    if(Object.keys(notes_obj).length==0)
    {
        notes_elem.innerHTML = `<h5>Nothing to Show! &nbsp; Use "Add a Note" section above to add notes.</h5>`;
    }
    else
    {
        notes_elem.innerHTML = html;
    }

};


// Overwrite Duplicate Title Card Function
function confirm_changes()
{
    let add_title = document.getElementById('add_title');
    let add_note = document.getElementById('add_note');

    let notes = localStorage.getItem('notes');
    notes_obj = JSON.parse(notes);

    notes_obj[add_title.value] = add_note.value;
    localStorage.setItem('notes', JSON.stringify(notes_obj));

    add_title.value = '';
    add_note.value = '';

    show_notes();
};



// Add Note Button Functionality
let add_btn = document.getElementById('add_btn');
add_btn.addEventListener('click', function(){
    let add_title = document.getElementById('add_title');
    let add_note = document.getElementById('add_note');

    let notes = localStorage.getItem('notes');
    notes_obj = JSON.parse(notes);


    if(add_title.value == '' || add_note.value == '' )
    {
        var alert_modal = new bootstrap.Modal(document.getElementById('alert_modal'), backdrop="true")
        alert_modal.show();

    }
    else if(notes_obj[add_title.value] !== undefined)
    {
        var confirm_modal = new bootstrap.Modal(document.getElementById('confirm_modal'), backdrop="true")
        confirm_modal.show();
    }
    else
    {
        notes_obj[add_title.value] = add_note.value;
        localStorage.setItem('notes', JSON.stringify(notes_obj));
    
        add_title.value = '';
        add_note.value = '';
    
        show_notes();
    }

});



// Important Button Function
function toggle_important(key)
{
    let imp_notes = localStorage.getItem('imp_notes');
    imp_notes_obj = JSON.parse(imp_notes);

    if(imp_notes_obj[key]==true)
    {
        delete imp_notes_obj[key];
    }
    else
    {
        imp_notes_obj[key]=true;
    }

    localStorage.setItem('imp_notes',JSON.stringify(imp_notes_obj));
    show_notes();

};



// Delete Function
function delete_note(key)
{
    // delete notes from local storage
    let notes = localStorage.getItem('notes');
    notes_obj = JSON.parse(notes);

    delete notes_obj[key];
    localStorage.setItem('notes', JSON.stringify(notes_obj));


    // delete imp_notes from local storage
    let imp_notes = localStorage.getItem('imp_notes');
    imp_notes_obj = JSON.parse(imp_notes);

    if(imp_notes_obj[key]==true)
    {
        delete imp_notes_obj[key];
        localStorage.setItem('imp_notes',JSON.stringify(imp_notes_obj));
    }

    show_notes();

}




// Search Button Function
function search_note()
{
    let search_txt = document.getElementById("search_txt");
    let search_query = search_txt.value;
    let note_cards = document.getElementsByClassName('note_card');

    Array.from(note_cards).forEach(function(element){
        let card_h5 = element.querySelector('h5').innerText;
        let card_p = element.querySelector('p').innerText;
        let card_txt = card_h5 +' '+ card_p;

        if(card_txt.includes(search_query))
        {
            element.style.display = 'block';
        }
        else
        {
            element.style.display = 'none';
        }
    });

}

