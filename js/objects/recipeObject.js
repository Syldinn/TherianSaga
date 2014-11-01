var Recipe = function(xmlSource) {
    this.constr = "Recipe";
    this.id = xmlSource.getAttribute("id");
    this.name = new LocalizedText(xmlSource, "name");
    
    this.representedByItemBaseId = extractFromAttributeWithDefaultObject(xmlSource, "representedByItemBaseId", 0);
	this.producedItemBaseId = extractFromAttributeWithDefaultObject(xmlSource, "producedItemBaseId", 0);
	this.isDiscoverable = extractFromAttributeWithDefaultObject(xmlSource, "isDiscoverable", 0);
    
    this.useInTasks = extractListObject(xmlSource, "useInTasks");
	this.ingredients = extractListObject(xmlSource, "ingredients");
}

Recipe.prototype.getId = function() {
  return this.id;
};

Recipe.prototype.getName = function() {
  return this.name.getText();
};

Recipe.prototype.getValue = function() {
  return "";
};

Recipe.prototype.getProducedItemName = function() {
  return _ItemBaseData[this.producedItemBaseId].getName();
}

Recipe.prototype.getProducedItemIcon = function() {
  return _ItemBaseData[this.producedItemBaseId].getIcon();
}

Recipe.prototype.getRepresentedByItemName = function() {
  return _ItemBaseData[this.representedByItemBaseId].getName();
}

Recipe.prototype.getRepresentedByItemIcon = function() {
  return _ItemBaseData[this.representedByItemBaseId].getIcon();
}

Recipe.prototype.getTaskName = function(i) {
  return _TaskData[this.useInTasks[i]].getName();
}

// Explore Specific
Recipe.prototype.explore = function() {
  var result = [];
  return result.join("");
}

Recipe.prototype.exploreCategoryTitle = function(flavor) {
  if(flavor == "usedIn") 
  {
    if(_Language == 'FR') { return '<h2 class="subTitle exploreSubTitle">Utilis� dans les recettes suivantes:</h2>'; }
    return '<h2 class="subTitle exploreSubTitle">Used for the following recipes:</h2>';
  }
}

Recipe.prototype.exploreTableHeader = function() {
  return '<thead><tr><th class="exploreItemIconTitle"></th><th class="exploreItemNameTitle">Name</th><th class="exploreItemProducedItemTitle">Produced item Name</th><th class="exploreItemProducedItemIconTitle"></th></tr></thead>';
}

Recipe.prototype.exploreInformation = function() {
  var result = [];
  
  result.push('<tr class="exploreItem" onclick="exploreId(\'' + this.getId() + '\')" >');
  if(this.representedByItemBaseId != 0)
  {
    result.push('<td class="exploreItemIcon"><img src="' + this.getRepresentedByItemIcon() + '" ></td>');
  }
  else
  {
    result.push('<td></td>');
  }
  result.push('<td class="exploreItemName">' + this.getName() + '</td><td class="exploreItemProducedItem">' + this.getProducedItemName() + '</td><td class="exploreItemProducedItemIconTitle"><img src="' + this.getProducedItemIcon() + '" ></td></tr>');
  
  return result.join("");
}