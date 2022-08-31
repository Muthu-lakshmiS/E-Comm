import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TuiHideSelectedPipe } from '@taiga-ui/kit';
import { DisplayText, LanguageText } from 'src/app/models/product-category';
import { CodeHelp } from 'src/app/utils/codehelp.util';

@Component({
  selector: 'app-multi-text-input',
  templateUrl: './multi-text-input.component.html',
  styleUrls: ['./multi-text-input.component.scss'],
})
export class MultiTextInputComponent implements OnInit {
  activeItemIndex = 0;

  selectedLanguage: LanguageText = {} as LanguageText;
  languages = CodeHelp.languages();
  @Input()
  label: string = '';
  @Input()
  displayText: DisplayText = {} as DisplayText;
  @Output()
  displayTextChange: EventEmitter<DisplayText> = new EventEmitter();

  constructor() {}

  textChange() {
    this.displayTextChange.emit(this.displayText);
  }

  ngOnInit(): void {
    this.selectedLanguage.language = 'en';
    if (!this.displayText) {
      this.displayText = {} as DisplayText;
    }
    if (!this.displayText.languageTexts) {
      this.displayText.languageTexts = [];
    } else {
      this.selectedLanguage = this.displayText.languageTexts[0];
    }
  }

  onLanguageClick(language: LanguageText) {
    if (!this.displayText.languageTexts) {
      this.displayText.languageTexts = [];
    }
    for (let text of this.displayText.languageTexts) {
      if (text.language == language.language) {
        this.selectedLanguage = text;
        return;
      }
    }
    this.selectedLanguage = {
      language: language.language,
      text: '',
    };
    this.displayText.languageTexts.push(this.selectedLanguage);
  }
}
