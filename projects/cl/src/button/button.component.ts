
import { FocusableOption, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import {
  AfterViewInit, ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject, OnDestroy,
  Optional, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  CanColor,
  CanColorCtor, CanDisable,
  CanDisableCtor, CanDisableRipple,
  CanDisableRippleCtor,
  MatRipple,
  mixinColor,
  mixinDisabled,
  mixinDisableRipple
} from '@angular/material/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

/** Default color palette for round buttons (mat-fab and mat-mini-fab) */
const DEFAULT_ROUND_BUTTON_COLOR = 'accent';

/**
 * List of classes to add to ClButton instances based on host attributes to
 * style as different variants.
 */
const BUTTON_HOST_ATTRIBUTES = [
  'simple-button',
  'fantastic-button',
  'flat-button',
  'icon-button',
  'raised-button',
  'stroked-button',
  'mini-fab',
  'fab',
];

// Boilerplate for applying mixins to ClButton.
/** @docs-private */
class ClButtonBase {
  constructor(public _elementRef: ElementRef) {}
}

const _ClButtonMixinBase: CanDisableRippleCtor & CanDisableCtor & CanColorCtor &
    typeof ClButtonBase = mixinColor(mixinDisabled(mixinDisableRipple(ClButtonBase)));

/**
 * Material design button.
 */
@Component({
  selector: `cl-button, cl-button[fantastic-button], cl-button[simple-button], cl-button[raised-button], cl-button[icon-button],
  cl-button[fab], cl-button[mini-fab], cl-button[stroked-button],
  cl-button[flat-button]`,
  exportAs: 'clButton',
  host: {
    '[attr.disabled]': 'disabled || null',
    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
    '[class.mat-button-disabled]': 'disabled',
    'class': 'mat-focus-indicator',
  },
  template: `<span class="mat-button-wrapper"><ng-content></ng-content></span>
  <span matRipple class="mat-button-ripple"
        [class.mat-button-ripple-round]="isRoundButton || isIconButton"
        [matRippleDisabled]="_isRippleDisabled()"
        [matRippleCentered]="isIconButton"
        [matRippleTrigger]="_getHostElement()"></span>
  <span class="mat-button-focus-overlay"></span>
  `,
  styleUrls: ['button.scss', '_button-base.scss', '_button-theme.scss'],
  inputs: ['disabled', 'disableRipple', 'color'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClButton extends _ClButtonMixinBase
    implements AfterViewInit, OnDestroy, CanDisable, CanColor, CanDisableRipple, FocusableOption {

  /** Whether the button is round. */
  readonly isRoundButton: boolean = this._hasHostAttributes('mat-fab', 'mat-mini-fab');

  /** Whether the button is icon button. */
  readonly isIconButton: boolean = this._hasHostAttributes('mat-icon-button');

  /** Reference to the MatRipple instance of the button. */
  @ViewChild(MatRipple) ripple: MatRipple;

  constructor(elementRef: ElementRef,
              private _focusMonitor: FocusMonitor,
              @Optional() @Inject(ANIMATION_MODULE_TYPE) public _animationMode: string) {
    super(elementRef);

    // For each of the variant selectors that is present in the button's host
    // attributes, add the correct corresponding class.
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        (this._getHostElement() as HTMLElement).classList.add(attr);
      }
    }

    // Add a class that applies to all buttons. This makes it easier to target if somebody
    // wants to target all Material buttons. We do it here rather than `host` to ensure that
    // the class is applied to derived classes.
    elementRef.nativeElement.classList.add('mat-button-base');

    if (this.isRoundButton) {
      this.color = DEFAULT_ROUND_BUTTON_COLOR;
    }
  }

  ngAfterViewInit() {
    this._focusMonitor.monitor(this._elementRef, true);
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  /** Focuses the button. */
  focus(origin?: FocusOrigin, options?: FocusOptions): void {
    if (origin) {
      this._focusMonitor.focusVia(this._getHostElement(), origin, options);
    } else {
      this._getHostElement().focus(options);
    }
  }

  _getHostElement() {
    return this._elementRef.nativeElement;
  }

  _isRippleDisabled() {
    return this.disableRipple || this.disabled;
  }

  /** Gets whether the button has one of the given attributes. */
  _hasHostAttributes(...attributes: string[]) {
    return attributes.some(attribute => this._getHostElement().hasAttribute(attribute));
  }

  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_disableRipple: BooleanInput;
}