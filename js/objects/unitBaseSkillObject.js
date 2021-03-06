﻿var UnitBaseSkill = function(xmlSource) {
    this.constr = "UnitBaseSkill";
    this.id = xmlSource.getAttribute("id");
    
    this.value = extractFromAttributeWithDefaultObject(xmlSource, "value", 0);
    this.skillId = extractFromAttributeWithDefaultObject(xmlSource, "skillId", 0);
    this.unitBaseId = extractFromAttributeWithDefaultObject(xmlSource, "unitBaseId", 0);
    this.isProxy = extractFromAttributeWithDefaultObject(xmlSource, "isProxy", 0);
}

UnitBaseSkill.prototype.getId = function() {
  return this.id;
};

UnitBaseSkill.prototype.getName = function() {
  return "";
};

UnitBaseSkill.prototype.getValue = function() {
  return this.value;
};

UnitBaseSkill.prototype.getUnitBaseId = function() {
  return _UnitBaseData[this.unitBaseId].getId();
};

UnitBaseSkill.prototype.getUnitBaseName = function() {
  return _UnitBaseData[this.unitBaseId].getName();
};

UnitBaseSkill.prototype.getUnitBaseIcon = function() {
  return _UnitBaseData[this.unitBaseId].getIcon();
};

UnitBaseSkill.prototype.getUnitBaseInterestName = function() {
  return _UnitBaseData[this.unitBaseId].getInterestSkillName();
};

UnitBaseSkill.prototype.getUnitBaseInterestIcon = function() {
  return _UnitBaseData[this.unitBaseId].getInterestSkillIcon();
};

UnitBaseSkill.prototype.getUnitBaseInterestValue = function() {
  return _UnitBaseData[this.unitBaseId].getInterestSkillValue();
};

UnitBaseSkill.prototype.getSkillId = function() {
  return this.skillId;
};

UnitBaseSkill.prototype.getSkillName = function() {
  return _SkillData[this.skillId].getName();
};

UnitBaseSkill.prototype.getSkillIcon = function() {
  return _SkillData[this.skillId].getIcon();
};

// Explore Specific
UnitBaseSkill.prototype.explore = function() {
  var result = [];
  return result.join("");
}

UnitBaseSkill.prototype.exploreCategoryTitle = function(flavor) {
  if(flavor == "usedBy") 
  {
    if(_Language == 'FR') { return '<h2 class="subTitle exploreSubTitle">Est possédépar les humains/créatures:</h2>'; }
    return '<h2 class="subTitle exploreSubTitle">Is owned by the humans/creatures:</h2>';
  }
  if(_Language == 'FR') { return '<h2 class="subTitle exploreSubTitle">A les compétences suivantes:</h2>'; }
  return '<h2 class="subTitle exploreSubTitle">Has the following skills:</h2>';
}

UnitBaseSkill.prototype.exploreTableHeader = function(flavor) {
  if(flavor == "usedBy") 
  {
    return '<thead><tr><th class="exploreItemIconTitle"></th><th class="exploreItemNameTitle">Name</th><th class="exploreItemValueTitle">Skill Value</th><th class="exploreItemValueTitle">Interest</th><th class="exploreItemValueTitle">Interest Level</th></tr></thead>';
  }
  return '<thead><tr><th class="exploreItemIconTitle"></th><th class="exploreItemNameTitle">Name</th><th class="exploreItemValueTitle">Skill Value</th></tr></thead>';
}

UnitBaseSkill.prototype.exploreInformation = function(flavor) {
  if(flavor == "usedBy") 
  {
    return '<tr class="exploreItem" onclick="exploreId(\'' + this.getUnitBaseId() + '\')" ><td class="exploreItemIcon"><img src="' + this.getUnitBaseIcon() + '" ></td><td class="exploreItemName">' + this.getUnitBaseName() + '</td><td class="exploreItemValue">' + this.getValue() + '</td><td class="exploreItemValue"><div class="UnitBaseHeight"><img class="vertAlign" src="' + this.getUnitBaseInterestIcon() + '" ><div class="vertAlign spaceLeft"> ' + this.getUnitBaseInterestName() + '</div></div></td><td>' + this.getUnitBaseInterestValue() + '</td></tr>';
  }
  return '<tr class="exploreItem" onclick="exploreId(\'' + this.getSkillId() + '\')" ><td class="exploreItemIcon"><img src="' + this.getSkillIcon() + '" ></td><td class="exploreItemName">' + this.getSkillName() + '</td><td class="exploreItemValue">' + this.getValue() + '</td></tr>';
}