﻿var Skill = function(xmlSource, fakeIdCreation) {
  this.constr = "Skill";
  if(fakeIdCreation === undefined) // parameter was omitted in call
	{
    this.id = xmlSource.getAttribute("id");
    this.name = new LocalizedText(xmlSource, "name");
	
    this.iconId = extractFromAttributeWithDefaultObject(xmlSource, "iconId", 0);
    this.sequenceOrder = extractFromAttributeWithDefaultObject(xmlSource, "sequenceOrder", 0);
   
    
    this.usedByItemTypes = extractListObject(xmlSource, "usedByItemTypes");
    this.usedByUnitBaseSkills = extractListObject(xmlSource, "usedByUnitBaseSkills");
    this.usedByItemBaseSkills = extractListObject(xmlSource, "usedByItemBaseSkills");
    this.taskGroups = extractListObject(xmlSource, "taskGroups");
    this.subSkills = extractListObject(xmlSource, "subSkills");
  }
  else
  {
    this.id = 0;
    this.name = new LocalizedText(xmlSource, "name", "");
	
    this.iconId = 0;
    this.sequenceOrder = 0;
   
    
    this.usedByItemTypes = [];
    this.usedByUnitBaseSkills = [];
    this.usedByItemBaseSkills = [];
    this.taskGroups = [];
    this.subSkills = [];
  }
}

Skill.prototype.getId = function() {
  return this.id;
};

Skill.prototype.getName = function() {
  return this.name.getText();
};

Skill.prototype.getValue = function() {
  return "";
};

Skill.prototype.getIcon = function() {
  return getImageLink(this.iconId);
};

Skill.prototype.explore = function() {
  var result = [];

  // First set a Title
  result.push('<img src="' + this.getIcon() + '" ><h1 class="exploreTitle title" id="' + this.getId() + '">' + this.getName() + '</h1>');

  result.push( exploreList(this.usedByItemTypes, "usedBy") );
  result.push( exploreList(this.usedByUnitBaseSkills, "usedBy") );
  result.push(exploreList(this.usedByItemBaseSkills, "usedBy") );
  result.push(exploreList(this.subSkills, "sub") );
  result.push(exploreList(this.taskGroups) );
  
  // If it's a terrain skill, find the regions with this skill
  var regionWithTerrainSkill = [];
  for (var id in _RegionData) {
    if(_RegionData[id].getTerrainSkillId() == this.id)
    {
      regionWithTerrainSkill.push(id);
    }
  }
  result.push(exploreList(regionWithTerrainSkill, "terrain") );

  return result.join("");
}

Skill.prototype.exploreCategoryTitle = function(flavor) {
  if(flavor == "sub") 
  {
    if(_Language == 'FR') { return '<h2 class="subTitle exploreSubTitle">A les sous compétences suivantes:</h2>'; }
    return '<h2 class="subTitle exploreSubTitle">Has following sub skills:</h2>';
  }
  if(_Language == 'FR') { return '<h2 class="subTitle exploreSubTitle">A les compétences suivantes:</h2>'; }
  return '<h2 class="subTitle exploreSubTitle">Has following skills:</h2>';
}

Skill.prototype.exploreTableHeader = function() {
  return '<thead><tr><th class="exploreItemIconTitle"></th><th class="exploreItemNameTitle">Name</th></tr></thead>';
}

Skill.prototype.exploreInformation = function() {
  return '<tr class="exploreItem" onclick="exploreId(\'' + this.getId() + '\')" ><td class="exploreItemIcon"><img src="' + this.getIcon() + '" ></td><td class="exploreItemName">' + this.getName() + '</td></tr>';
}