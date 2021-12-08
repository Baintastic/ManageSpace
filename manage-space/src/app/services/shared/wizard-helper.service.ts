import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WizardHelperService {
  
  constructor() { }

  showTab(tabNumber: number, isAddMode: boolean, isOptionsMode: boolean): void {
    var tabs = Array.from(document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>)
    //for some reason , two of the tabs from the previous html modal get picked up so we get the first tab on the current modal

    if (tabs.length > 2) {
      tabs[tabNumber + 2].style.display = "block";
    }
    else {
      tabs[tabNumber].style.display = "block";
    }

    var prevBtn = document.getElementById('prevBtn');
    var title = document.getElementById("title");

    if (prevBtn) {
      if (tabNumber == 0) {
        prevBtn.style.display = 'none';
        title?.classList.remove('col-10');
        title?.classList.add('col-12');
      }
      else {
        prevBtn.style.display = 'inline';
        title?.classList.remove('col-12');
        title?.classList.add('col-10');
      }
    }
    if(isOptionsMode){
      var nextBtn = document.getElementById('nextBtn');
      if (nextBtn) {
        var btnText = isAddMode ? 'ADD STAFF MEMBER' : 'UPDATE STAFF MEMBER';
        nextBtn.innerHTML = (tabNumber == (tabs.length - 1)) ? `${btnText}` : 'NEXT';
      }
    }
    this.fixStepIndicator(tabNumber)
  }

  isLastStep(tabNumber: number, currentTab: number): boolean {
    var isLastStep = false;
    var tabs = Array.from(document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>)

    // Hide the current tab:
    tabs[currentTab].style.display = 'none';
    
    if (currentTab + tabNumber >= tabs.length) {
      isLastStep = true;
      return isLastStep;
    }
    return isLastStep;
  }

  nextPrev(tabNumber: number, currentTab: number, isAddMode:boolean, isDeleteMode: boolean): number {
    var tabs = Array.from(document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>)

    // Hide the current tab:
    tabs[currentTab].style.display = 'none';
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + tabNumber;

    this.showTab(currentTab, isAddMode, isDeleteMode);
    return currentTab;
  }

  private fixStepIndicator(n: number): void {
    // This function removes the "active" class of all steps...
    var i, step = document.getElementsByClassName('step');
    for (i = 0; i < step.length; i++) {
      step[i].className = step[i].className.replace(' active', '');
    }
    //... and adds the "active" class to the current step:
    step[n].className += ' active';
  }
}
