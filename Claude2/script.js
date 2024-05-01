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

fetch('GID1.json')
    .then(response => response.json())
    .then(jsonData => {
        const quests = extractQuestData(jsonData);
        const locationNames = [];
        const monsterNames = [];
        const itemNames = [];
        const giverList = [];

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

        createBulletList(uniqueLocations, 'locations');
        createBulletList(uniqueMonsters, 'monsters');
        createBulletList(uniqueItems, 'items');
        createBulletList(uniqueGivers, 'givers');

        //validate locations

        const notAllowedLocations = uniqueLocations.filter(location => {
            return !allowedLocations.includes(location);
        });

        const notAllowedMonsters = uniqueMonsters.filter(monster => {
            return !allowedMonsters.includes(monster);
        });

        const notAllowedItems = uniqueItems.filter(item => {
            return !allowedItems.includes(item);
        });

        const notAllowedGivers = uniqueGivers.filter(giver => {
            return !allowedGivers.includes(giver);
        });

        const numberOfNotAllowedLocations = notAllowedLocations.length;
        const numberOfNotAllowedMonsters = notAllowedMonsters.length;
        const numberOfNotAllowedItems = notAllowedItems.length;
        const numberOfNotAllowedGivers = notAllowedGivers.length;

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

function LoadJSON(file) {

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
