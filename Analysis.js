function RenderData(container) {
    for (let i = 1; i <= 10; i++) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div class="m-3">
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseArea${i}" aria-expanded="false" aria-controls="collapseExample">
        GID ${i}
    </button>
    <div class="row collapse" id="collapseArea${i}">
        <div class="row">
            <div class="col">
                <h3>Locations</h3>
                <div id="locations${i}">
                </div>
            </div>
            <div class="col">
                <h3>Monsters</h3>
                <div id="monsters${i}">
                </div>
            </div>
            <div class="col">
                <h3>Items</h3>
                <div id="items${i}">
                </div>
            </div>
            <div class="col">
                <h3>Givers</h3>
                <div id="givers${i}">
                </div>
            </div>
        </div>
        <div class="row">
            <h4>Analysis</h4>
        </div>
        <div class="row">
            <div class="col">
                <h5>Incorrect Locations</h5>
                <div id="lList${i}"></div>
                Correct locations : <span id="il${i}" class="text-info"></span>
            </div>
            <div class="col">
                <h5>Incorrect Monsters</h5>
                <div id="mList${i}"></div>
                Correct Monsters : <span id="im${i}" class="text-info"></span>
            </div>
            <div class="col">
                <h5>Incorrect Items</h5>
                <div id="iList${i}"></div>
                Correct Items : <span id="ii${i}" class="text-info"></span>
            </div>
            <div class="col">
                <h5>Incorrect Givers</h5>
                <div id="gList${i}"></div>
                Correct Givers : <span id="ig${i}" class="text-info"></span>
            </div>
        </div>
    </div>
</div>
  `;
        container.appendChild(div);
    }
}

function extractQuestData(jsonData) {
    const quests = [];

    for (const questId in jsonData) {
        const questData = jsonData[questId][0];

        quests.push({
            id: questId,
            title: questData.title,
            giver: questData.giver,
            objective: questData.objective,
            locations: questData.locations,
            monsters: questData.monsters,
            items: questData.items,
            reward: questData.reward
        });
    }
    return quests;
}

//LoadJSON('GID1.json', 'locations1', 'monsters1','items1','givers1','il1','lList1','im1','mList1','ii1','iList1','ig1','gList1')

function LoadJSON(file,
                  cLocation,
                  cMonster,
                  cItem,
                  cGiver,
                  aLocations,
                  aMonsters,
                  aItems,
                  aGivers,
                  lAnalysis,
                  lList,
                  mAnalysis,
                  mList,
                  iAnalysis,
                  iList,
                  gAnalysis,
                  gList) {
    fetch(file)
        .then(response => response.json())
        .then(jsonData => {
            const quests = extractQuestData(jsonData);
            const locationNames = [];
            const monsterNames = [];
            const itemNames = [];
            const giverList = [];

            console.log(aLocations)

            //location list
            for (const quest of quests) {
                for (const location of quest.locations) {
                    locationNames.push(location.name);
                }
                for (const monster of quest.monsters) {
                    monsterNames.push(monster.type);
                }
                for (const item of quest.items) {
                    itemNames.push(item.name);
                }
                giverList.push(quest.giver);
            }

            // console.log('locations: '+ locationNames);
            // console.log('monsters: '+ monsterNames);
            // console.log('items: '+ itemNames);
            // console.log('givers: '+ giverList);

            const uniqueLocations = [...new Set(locationNames)];
            const uniqueMonsters = [...new Set(monsterNames)];
            const uniqueItems = [...new Set(itemNames)];
            const uniqueGivers = [...new Set(giverList)];

            // console.log("unique Locations: " +  uniqueLocations);
            // console.log("unique monsters: " +  uniqueMonsters);
            // console.log("unique items: " +  uniqueItems);
            // console.log("unique givers: " +  uniqueGivers);

            createBulletList(uniqueLocations, cLocation);
            createBulletList(uniqueMonsters, cMonster);
            createBulletList(uniqueItems, cItem);
            createBulletList(uniqueGivers, cGiver);

            //validate locations

            const notAllowedLocations = uniqueLocations.filter(location => {
                return !aLocations.includes(location);
            });

            const notAllowedMonsters = uniqueMonsters.filter(monster => {
                return !aMonsters.includes(monster);
            });

            const notAllowedItems = uniqueItems.filter(item => {
                return !aItems.includes(item);
            });

            const notAllowedGivers = uniqueGivers.filter(giver => {
                return !aGivers.includes(giver);
            });

            const numberOfNotAllowedLocations = notAllowedLocations.length;
            const numberOfNotAllowedMonsters = notAllowedMonsters.length;
            const numberOfNotAllowedItems = notAllowedItems.length;
            const numberOfNotAllowedGivers = notAllowedGivers.length;

            Accuracy(notAllowedLocations, uniqueLocations, lAnalysis, lList)
            Accuracy(notAllowedMonsters, uniqueMonsters, mAnalysis, mList)
            Accuracy(notAllowedItems, uniqueItems, iAnalysis, iList)
            Accuracy(notAllowedGivers, uniqueGivers, gAnalysis, gList)

            // console.log("Not allowed locations:", notAllowedLocations);
            // console.log("Number of not allowed locations:", numberOfNotAllowedLocations);
            //
            // console.log("Not allowed Monsters:", notAllowedMonsters);
            // console.log("Number of not allowed Monsters:", numberOfNotAllowedMonsters);
            //
            // console.log("Not allowed items:", notAllowedItems);
            // console.log("Number of not allowed items:", numberOfNotAllowedItems);
            //
            // console.log("Not allowed givers:", notAllowedGivers);
            // console.log("Number of not allowed givers:", numberOfNotAllowedGivers);

        })
        .catch(error => console.error('Error loading JSON:', error));
}

function createBulletList(array, containerId) {
    const container = document.getElementById(containerId);
    const ul = document.createElement('ul');

    array.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });

    container.appendChild(ul);
}

function Accuracy(inCorrectList, allList, CIDAnalysis, CIDList) {
    const containerStats = document.getElementById(CIDAnalysis)
    const containerList = document.getElementById(CIDList)

    const ul = document.createElement('ul')

    //display list
    inCorrectList.forEach(item => {
        const li = document.createElement('li')
        li.textContent = item
        ul.appendChild(li)
    })

    containerList.appendChild(ul)

    //display stats
    let inCorrectItems = inCorrectList.length
    let allItems = allList.length
    let correctItems = allItems - inCorrectItems

    let accuracy = (correctItems / allItems) * 100

    containerStats.innerText = accuracy.toFixed(2) + '%'

    //console.log(accuracy)
}