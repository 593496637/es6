import directiveFocus from './focus'
import directiveUnit from './unit'
import directiveFormatTime from './formatTime'
import directiveAnimate from './animate'

export default function directives(app) {
  directiveFocus(app)
  directiveUnit(app)
  directiveFormatTime(app)
  directiveAnimate(app)
}