const S=JSON.parse(localStorage.getItem("blackfiles")||'{"found":[],"notes":"","passwords":[],"null":false}');

const screen=document.getElementById("screen");

const save=()=>{
localStorage.setItem("blackfiles",JSON.stringify(S));
};

const esc=s=>String(s).replace(/[&<>"]/g,c=>({
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;"
}[c]));

const files={
"014":{
title:"CASE 014 — THE EMPTY HOUSE",
text:"A house was found unlocked. No sign of forced entry. The owner was never located. The report ends with a single handwritten mark: △.",
clue:"Look for the triangle elsewhere."
},

"027":{
title:"CASE 027 — ARCHIVE FAILURE",
text:"A storage system lost exactly seven files at 03:17. The system clock was confirmed correct.",
clue:"03:17 appears in another record."
},

"031":{
title:"CASE 031 — THE PHOTOGRAPH",
text:"A photograph shows four people. One face has been scratched out. On the back: 4 / 11 / 19.",
clue:"The date is not necessarily a date."
},

"044":{
title:"CASE 044 — UNKNOWN SYMBOL",
text:"A symbol was found on three unrelated objects. The same symbol appears in CASE 014.",
clue:"The objects were catalogued under different names."
},

"052":{
title:"CASE 052 — NO RECORD",
text:"A person named ELIAS VANE appears in two messages. A search of the database returns no user, no case, and no archive entry.",
clue:"Try searching the name in the Terminal later."
},

"061":{
title:"CASE 061 — THE SECOND COPY",
text:"A report has two copies. They are identical except one contains the sentence: 'NULL is not empty.'",
clue:"This is the first explicit reference to NULL. It does not explain what NULL is."
}
};

const users=[
["MARA-7","Archivist","Active","Claims she only maintains old files."],
["VANE-04","Unknown","Missing","Referenced repeatedly, but has no profile."],
["ORBIT","Researcher","Inactive","Three messages contradict his stated timeline."],
["NORTH","Courier","Active","Appears in Case 027 and Case 044."],
["LATCH","Technician","Deleted","Profile was removed after an archive failure."],
["GREY-12","Observer","Unknown","No cases. Six login records."],
["PILOT","Analyst","Active","Keeps asking about BLACKFILES."],
["RIVER","Former user","Deleted","Last activity: 03:17."],
["ECHO","Unknown","Active","Messages are always sent exactly 11 minutes apart."],
["KITE","Researcher","Inactive","Owns a document referencing the triangle."],
["MIRROR","Unknown","Unknown","Profile contains no text."],
["CIPHER","Analyst","Active","Has access to restricted files."],
["SABLE","Courier","Deleted","Connected to the same four cases."],
["INDEX","Archivist","Active","Claims the archive has never been altered."],
["ZERO","Unknown","Unknown","Username appears in corrupted records."]
];

const messages=[
["MARA-7 → NORTH","Do not use the old index. It was changed."],
["NORTH → MARA-7","Changed by whom?"],
["MARA-7 → NORTH","You already know the answer."],
["ORBIT → ECHO","03:17 again. That's not coincidence."],
["ECHO → ORBIT","Stop looking at the time."],
["PILOT → UNKNOWN","Who is NULL?"],
["UNKNOWN → PILOT","Wrong question."],
["UNKNOWN → PILOT","Ask what NULL is."],
["KITE → LATCH","The triangle is in the photograph."],
["LATCH → KITE","Then the photograph is not evidence. It's an index."],
["RIVER → GREY-12","I found the missing file."],
["GREY-12 → RIVER","Delete this conversation."],
["CIPHER → ZERO","BLACKFILES should never have been accessible."],
["ZERO → CIPHER","Then why can we still see it?"],
["ECHO → UNKNOWN","PARKER PRIME"],
["UNKNOWN → ECHO","Not yet."]
];

function home(){
screen.innerHTML=`
<div class="panel">
<h1 class="title">BLACKFILES</h1>
<p>ACCESS: UNKNOWN</p>
<p>DATABASE STATUS: PARTIALLY CORRUPTED</p>
<p class="muted">There is no explanation. Investigate.</p>
</div>

<div class="panel">
<b>INVESTIGATOR NOTICE</b>
<p class="small">
This is a fictional game. Nothing here connects to real hidden services or real-world systems.
</p>
</div>

<div class="panel">
<b>PROGRESS</b>
<p>${S.found.length} evidence items discovered.</p>
<p>${S.null?"NULL CONNECTION DISCOVERED":"NULL CONNECTION: UNKNOWN"}</p>
</div>`;
}

function cases(){
screen.innerHTML=`
<div class="panel">
<h1 class="title">CASE DATABASE</h1>

${Object.entries(files).map(([id,f])=>`
<div class="file ${S.found.includes(id)?'found':''}" onclick="openCase('${id}')">
<b>${f.title}</b>
<div class="small">
FILE ${id} • ${S.found.includes(id)?'REVIEWED':'UNREAD'}
</div>
</div>
`).join("")}

</div>`;
}

function openCase(id){
const f=files[id];

if(!S.found.includes(id)){
S.found.push(id);
save();
}

screen.innerHTML=`
<div class="panel">
<h1 class="title">${f.title}</h1>
<pre>${f.text}</pre>

<button class="action"
onclick="this.nextElementSibling.style.display='block'">
Inspect evidence
</button>

<div class="clue">${f.clue}</div>
</div>

<button class="action" onclick="cases()">← Back</button>
`;
}

function users(){
screen.innerHTML=`
<div class="panel">
<h1 class="title">USERS</h1>

${users.map(u=>`
<div class="file">
<b>${u[0]}</b>
<span class="tag">${u[1]}</span>
<span class="tag">${u[2]}</span>
<p class="small">${u[3]}</p>
</div>
`).join("")}

</div>`;
}

function messages(){
screen.innerHTML=`
<div class="panel">
<h1 class="title">MESSAGES</h1>

${messages.map(m=>`
<div class="file">
<b>${m[0]}</b>
<p>${m[1]}</p>
</div>
`).join("")}

</div>`;
}

function archive(){
screen.innerHTML=`
<div class="panel">
<h1 class="title">ARCHIVE</h1>

<div class="file">INDEX_001 — Available</div>
<div class="file">INDEX_002 — Available</div>
<div class="file">INDEX_003 — CORRUPTED</div>
<div class="file">INDEX_004 — Available</div>
<div class="file locked">INDEX_005 — PASSWORD REQUIRED</div>
<div class="file locked">INDEX_006 — PASSWORD REQUIRED</div>
<div class="file">
INDEX_007 — <span class="danger">DELETED</span>
</div>

<p class="small">
Something was removed from the archive. Find out what.
</p>

</div>`;
}

function media(){
screen.innerHTML=`
<div class="panel">
<h1 class="title">MEDIA</h1>

<div class="file">
PHOTO_041 — Four people. One face scratched out.
<span class="tag">4/11/19</span>
</div>

<div class="file">
PHOTO_044 — An object marked △.
</div>

<div class="file">
SCAN_017 — A document stamped 03:17.
</div>

<div class="file">
VIDEO_000 — CORRUPTED
</div>

</div>`;
}

function corrupt(){
screen.innerHTML=`
<div class="panel">
<h1 class="title">CORRUPTED FILES</h1>

<p>Some fragments survived.</p>

<pre>
NU_ _  IS  _OT  EM_ TY
TH_  ARCHI_ E  WAS  _LTERED
03:17
△
4 / 11 / 19

[fragment ends]
</pre>

<p class="small">
Some blanks may be filled using evidence elsewhere.
</p>

</div>`;
}

function terminal(){
screen.innerHTML=`
<div class="panel">
<h1 class="title">TERMINAL</h1>

<p class="small">
Fictional terminal. It cannot access your computer.
</p>

<input id="cmd" placeholder="type: help">

<button class="action" onclick="runCmd()">ENTER</button>

<pre id="out"></pre>
</div>`;
}

function runCmd(){

let c=document.getElementById("cmd").value.trim().toLowerCase();

let o=document.getElementById("out");

let r={
help:"commands: help / files / users / search / status / null",
files:"014 027 031 044 052 061",
users:"15 profiles indexed",
status:"BLACKFILES: ACTIVE",
null:"ERROR: TERM NOT FOUND"
}[c]||"UNKNOWN COMMAND";

if(c==="null"&&S.found.includes("061")){

r="NULL is not empty. It is an organization. ACCESS DENIED.";

S.null=true;

save();
}

o.textContent=r;
}

function notes(){

screen.innerHTML=`
<div class="panel">
<h1 class="title">INVESTIGATION NOTEBOOK</h1>

<textarea
id="notes"
rows="18"
placeholder="Write your theories here..."
>${esc(S.notes)}</textarea>

<button
class="action"
onclick="
S.notes=document.getElementById('notes').value;
save();
alert('Saved.')
">
SAVE NOTES
</button>

</div>`;
}

function page(p){

({
home,
cases,
users,
archive,
messages,
media,
terminal,
corrupt,
notes
}[p]||home)();
}

document
.querySelectorAll("aside button")
.forEach(b=>b.onclick=()=>page(b.dataset.page));

home();
