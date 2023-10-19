// import { Directive, HostListener, HostBinding } from '@angular/core';

// @Directive({
//   selector: '[appDropdown]'
// })

// export class DropdownDirective {
//   @HostBinding('class.show') isOpen = false;

//   @HostListener('click') toggleOpen() {
//     this.isOpen = !this.isOpen;
//   }


// }

//###### It is unclear what is wrong with the above solution. Neither myself, nor ChatGPT can find issue with how it is implemented.  The importations are correct, because the following code, which uses ElementRef to directly alter the DOM produces the desired behavior in the toggle menu. Please advise.

import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  constructor(private el: ElementRef) {}

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    const dropdownMenu = this.el.nativeElement.querySelector('.dropdown-menu');
    if (this.isOpen) {
      dropdownMenu.style.display = 'block';
    } else {
      dropdownMenu.style.display = 'none';
    }
  }
}
