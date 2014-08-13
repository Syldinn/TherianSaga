////////////////////////
// Helper for display //
////////////////////////

var _TherianSagaImageLocation = "http://ttsassets.blob.core.windows.net/gameassets/Images/";
var _TherianSagaDefaultImage = _TherianSagaImageLocation + "00600/00619.png";
var _Language = 'EN';
var _CurrentOutput = '';

function setLanguage(button) {
  _Language = button.id;
  removeLanguageSelection();
  addClass("selected", button);
  displayOperation();
}

function getLocalizedName(dataElement) {
  if (_Language == 'FR') {
    return getNameFR(dataElement)
  } else {
    return getNameEN(dataElement)
  }
}


function getItemBaseName(elementSource) {
  if (_Language == 'FR') {
    return getNameFR(_ItemBaseData[elementSource['itemBaseId']])
  } else {
    return getNameEN(_ItemBaseData[elementSource['itemBaseId']])
  }
}

function getSkillName(elementSource) {
  if (_Language == 'FR') {
    return getNameFR(_SkillData[elementSource['skillId']])
  } else {
    return getNameEN(_SkillData[elementSource['skillId']])
  }
}

function getItemTypeName(elementSource) {
  if (_Language == 'FR') {
    return getNameFR(_ItemTypeData[elementSource['skillId']])
  } else {
    return getNameEN(_ItemTypeData[elementSource['skillId']])
  }
}

function getParentItemTypeName(elementSource) {
  var parentId = elementSource['parentItemTypeId'];
  if (parentId != 0) {
    if (_Language == 'FR') {
      return getNameFR(_ItemTypeData[parentId]);
    } else {
      return getNameEN(_ItemTypeData[parentId]);
    }
  }
  if (_Language == 'FR') {
    return "Rien";
  } else {
    return "Nothing";
  }
}

function getImage(elmentSource) {
  var IconId = elmentSource["iconId"];
  if (IconId != 0) {
    return _TherianSagaImageLocation + _ImageData[elmentSource["iconId"]]['path'];
  }
  return _TherianSagaDefaultImage;
}

function getNameEN(dataElement) {
  return dataElement['nameEN'];
}

function getNameFR(dataElement) {
  return dataElement['nameFR'];
}

function translateIdentifierToText(type) {
  if (_Language == 'FR') {
    if(type == "usedByItemTypes") { return "Présent dans les objets de ces catégories:"; }
	if(type == "usedByUnitBaseSkills") { return "Est possédée par les humains/créatures:"; }
	if(type == "usedByItemBaseSkills") { return "Est disponible sur les objets/batiments:"; }
  }
  if(type == "usedByItemTypes") { return "Present in item from those categories:"; }
  if(type == "usedByUnitBaseSkills") { return "Is owned by the humans/creatures:"; }
  if(type == "usedByItemBaseSkills") { return "Is available for the items/buildings:"; }
}

function displayOutput(origin) {
  hideAllOutput();
  removeOperationSelection();
  addClass("selected", origin);
  _CurrentOutput = origin.id + 'Output';
  removeClass("hidden", document.getElementById(_CurrentOutput));

  displayOperation();
}

function displayOperation() {
  if (_CurrentOutput == "DumpOutput") {
    displayDump(document.getElementById("SelectorDumpOutputComboBox"));
    return;
  }
}

function hideAllOutput() {
  addClass("hidden", document.getElementById('DumpOutput'));
  addClass("hidden", document.getElementById('ExploreOutput'));
}

function removeLanguageSelection() {
  removeClass("selected", document.getElementById('EN'));
  removeClass("selected", document.getElementById('FR'));
}

function removeOperationSelection() {
  removeClass("selected", document.getElementById('Dump'));
  removeClass("selected", document.getElementById('Explore'));
}

function addClass(classname, element) {
  var cn = element.className;
  //test for existance
  if (cn.indexOf(classname) != -1) {
    return;
  }
  //add a space if the element already has class
  if (cn != '') {
    classname = ' ' + classname;
  }
  element.className = cn + classname;
}

function removeClass(classname, element) {
  var cn = element.className;
  var rxp = new RegExp("\\s?\\b" + classname + "\\b", "g");
  cn = cn.replace(rxp, '');
  element.className = cn;
}