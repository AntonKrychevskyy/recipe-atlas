import { NotificationType, PopupActionType, ToastActionType } from '../constants';

export type ValueOf<T> = T[keyof T];

export interface RecipeSearchParams {
  s?: string;
  f?: string;
}

export interface RecipeFilterParams {
  a?: string;
  c?: string;
  i?: string;
}

export type RecipeParams = RecipeSearchParams | RecipeFilterParams;

export interface RecipeDetails {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: unknown;
  dateModified: unknown;
}

export interface NotificationConfig {
  type: ValueOf<typeof NotificationType>;
  title: string;
  summary: string;
  details: string | string[];
  trace?: string;
}

export interface ToastConfig extends NotificationConfig {
  duration?: number;
}

export interface IToast extends ToastConfig {
  id: number;
}

export interface AddToastAction {
  type: typeof ToastActionType.add;
  payload: IToast;
}

export interface RemoveToastAction {
  type: typeof ToastActionType.remove;
  payload: number;
}

export type ToasterAction = AddToastAction | RemoveToastAction;

export interface IToasterContext {
  toasts: IToast[];
  addToast: (toastConfig: ToastConfig) => void;
  removeToast: (id: number) => void;
}

export interface IPopup extends NotificationConfig {
  id: number;
}

export interface AddPopupAction {
  type: typeof PopupActionType.add;
  payload: IPopup;
}

export interface ClosePopupAction {
  type: typeof PopupActionType.close;
  payload: number;
}

export type PopupAction = AddPopupAction | ClosePopupAction;

export interface IPopupContext {
  popups: IPopup[];
  addPopup: (popupConfig: NotificationConfig) => void;
  closePopup: (id: number) => void;
}
