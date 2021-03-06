//////////////////
// Dump display //
//////////////////

function displayDump(selector) {
  var selectedValue = selector.options[selector.selectedIndex].value
  if (selectedValue != "") {
    eval(selectedValue)();
  }
}

function dumpItemBaseSkillData() {
  var result = '<table class="dumpTable dumpTable-ItemBaseSkill"><tr><th class="dumpTableHeader dumpTableHeader-ItemBaseSkill">Item</th><th class="dumpTableHeader dumpTableHeader-ItemBaseSkill">Skill</th><th class="dumpTableHeader dumpTableHeader-ItemBaseSkill">Value</th><th class="dumpTableHeader dumpTableHeader-ItemBaseSkill">ID</th></tr>';
  for (var itemBaseSkillId in _ItemBaseSkillData) {
    var itemBaseSkill = _ItemBaseSkillData[itemBaseSkillId];
    result += '<tr class="dumpTableElement dumpTableElement-ItemBaseSkill">';
    result += '<td class="dumpTableText dumpTableText-ItemBaseSkill">' + itemBaseSkill.getItemBaseName() + '</td>'
    result += '<td class="dumpTableText dumpTableText-ItemBaseSkill">' + itemBaseSkill.getSkillName() + '</td>'
    result += '<td class="dumpTableText dumpTableText-ItemBaseSkill">' + itemBaseSkill['value'] + '</td>'
    result += '<td class="dumpTableText dumpTableText-ItemBaseSkill">' + itemBaseSkillId + '</td></tr>';
  }
  result += '</table>'
  document.getElementById('DumpOutputResult').innerHTML = result;
}

function dumpDungeonData() {
  var result = '<table class="dumpTable"><tr><th>Dungeon</th><th>ID</th></tr>';
  for (var dungeonId in _DungeonData) {
    var dungeon = _DungeonData[dungeonId];
    result += '<tr><td>' + dungeon.getName() + '</td><td>' + dungeonId + '</td></tr>';
  }
  result += '</table>'
  document.getElementById('DumpOutputResult').innerHTML = result;
}

function dumpItemTypeData() {
  var result = '<table class="dumpTable"><tr><th>Icon</th><th>Item type</th><th>Parent type</th><th>ID</th></tr>';
  for (var itemTypeId in _ItemTypeData) {
    if(itemTypeId == 0) { continue; }
    var ItemType = _ItemTypeData[itemTypeId];
    result += '<tr><td><img src="' + ItemType.getIcon() + '" ></td><td>' + ItemType.getName() + '</td><td>' + ItemType.getParentItemTypeName() + '</td><td>' + itemTypeId + '</td></tr>';
  }
  result += '</table>'
  document.getElementById('DumpOutputResult').innerHTML = result;
}

function dumpItemBaseData() {
  var result = '<table class="dumpTable"><tr><th>Icon</th><th>Name</th><th>Item type</th><th>ID</th></tr>';
  for (var itemBaseId in _ItemBaseData) {
    if(itemBaseId == 0) { continue; }
    var itemBase = _ItemBaseData[itemBaseId];
    result += '<tr><td><img src="' + getImage(itemBase) + '" ></td><td>' + itemBase.getName() + '</td><td>' + _ItemTypeData[itemBase['itemTypeId']].getName() + '</td><td>' + itemBaseId + '</td></tr>';
  }
  result += '</table>'
  document.getElementById('DumpOutputResult').innerHTML = result;
}

function dumpSkillData() {
  var result = '<table class="dumpTable"><tr><th>Icon</th><th>Skill</th><th>ID</th></tr>';
  for (var skillId in _SkillData) {
    var skill = _SkillData[skillId];
    result += '<tr><td><img src="' + getImage(skill) + '" ></td><td>' + skill.getName() + '</td><td>' + skillId + '</td></tr>';
  }
  result += '</table>'
  document.getElementById('DumpOutputResult').innerHTML = result;
}

function dumpTaskGroupData() {
  var result = '<table class="dumpTable"><tr><th>Icon</th><th>Task group</th><th>ID</th></tr>';
  for (var taskGroupId in _TaskGroupData) {
    var taskGroup = _TaskGroupData[taskGroupId];
    result += '<tr><td><img src="' + taskGroup.getIcon() + '" ></td><td>' + taskGroup.getName() + '</td><td>' + taskGroupId + '</td></tr>';
  }
  result += '</table>'
  document.getElementById('DumpOutputResult').innerHTML = result;
}

function dumpTaskData() {
  var result = '<table class="dumpTable"><tr><th>Name</th><th>Skill</th><th>Duration</th><th>Effort</th><th>Difficulty</th><th>ID</th></tr>';
  for (var taskId in _TaskData) {
    var task = _TaskData[taskId];
    result += '<tr><td>' + task.getName() + '</td><td>' + task.getSkillName() + '</td><td>' + task['duration'] + '</td><td>' + task['effort'] + '</td><td>' + task['difficulty'] + '</td><td>' + taskId + '</td></tr>';
  }
  result += '</table>'
  document.getElementById('DumpOutputResult').innerHTML = result;
}

function dumpRecipeData() {
  var result = '<table class="dumpTable"><tr><th>Recipe name</th><th>Produced item base</th><th>Represented by</th><th>Is discoverable</th><th>Tasks</th><th>Ingredients</th></tr>';
  for (var recipeId in _RecipeData) {
    var recipe = _RecipeData[recipeId];
    result += '<tr><td>' + recipe.getName() + '</td><td>' + recipe.getProducedItemName() + '</td><td>' + recipe.getRepresentedByItemName() + '</td><td>' + recipe['isDiscoverable'] + '</td><td>';
    for (var i in recipe['useInTasks'])
    {
        result += recipe.getTaskName(i) + '<br />';
    }
    result += '</td><td>';
    for (var i in recipe['ingredients'])
    {
        var recipeIngredient = _RecipeIngredientData[recipe['ingredients'][i]]
        result += recipeIngredient['quantity'] + ' ';
        if (recipeIngredient['itemTypeId'] == 0)
        {
            // Not a generic ingredient, use itemBaseId instead
            result += _ItemBaseData[recipeIngredient['itemBaseId']].getName() + '<br />';
        } else {
            result += _ItemTypeData[recipeIngredient['itemTypeId']].getName() + '<br />';
        }
    }
    result += '</td></tr>';
  }
  result += '</table>'
  document.getElementById('DumpOutputResult').innerHTML = result;
}
