const container = document.getElementById('tblData'); // Replace 'yourContainer' with the ID of the element where you want to insert the divs

RenderData(container)

for (let i = 1; i<=10; i++){
    LoadJSON(`GID${i}.json`,
        `locations${i}`,
        `monsters${i}`,
        `items${i}`,
        `givers${i}`,
        eval(`allowedLocations${i}`),
        eval(`allowedMonsters${i}`),
        eval(`allowedItems${i}`),
        eval(`allowedGivers${i}`),
        `il${i}`,
        `lList${i}`,
        `im${i}`,
        `mList${i}`,
        `ii${i}`,
        `iList${i}`,
        `ig${i}`,
        `gList${i}`)
}


