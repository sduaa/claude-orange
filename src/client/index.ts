/**
 * Claude Orange theme — apply() owns the whole surface and retracts
 * it on dispose (the ThemePresenter retraction discipline): the
 * data-dsh-claude-orange body attribute the stylesheet is scoped on,
 * and the document title. The CSS is injected as a skin-owned <style>
 * node (deterministic: not subject to CSS-modules tree-shaking) and
 * retracted with the effect. No services are injected: the theme needs
 * only the DOM.
 *
 * Style your design in ./claude-orange.module.css, scoped under
 * body[data-dsh-claude-orange] (dark variant body[data-dsh-claude-orange][data-ds-dark-theme]).
 */
import type { Context } from '@deepseek-ai/cordis'
import css from './claude-orange.module.css'

/** The product title the theme pins (captured by the shell's DocumentTitle after settle). */
const SKIN_TITLE = 'Claude Orange · DeepSeek 在线'

/** id of the <style> node that carries the theme stylesheet (idempotent re-injection). */
const STYLE_ID = 'dsh-claude-orange-skin-css'

/**
 * Apply the Claude Orange theme: body attribute and title.
 * All writes are retracted by the effect disposer on dispose.
 * @param ctx - owning context (the effect lifecycle owns retraction).
 */
export function apply(ctx: Context): void {
  const body = document.body
  const originalTitle = document.title
  body.setAttribute('data-dsh-claude-orange', '')

  // Explicitly inject the stylesheet: tree-shaking drops the CSS module
  // once no code references it (a lesson learned the hard way), silently
  // unskinning the whole UI. A skin-owned <style> node is deterministic.
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!style) {
    style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = typeof css === 'string' ? css : String(css)
    document.head.append(style)
  }

  document.title = SKIN_TITLE

  ctx.effect(() => () => {
    body.removeAttribute('data-dsh-claude-orange')
    document.getElementById(STYLE_ID)?.remove()
    // Only restore when the theme's own title still stands — a session title
    // projected by the shell must not be clobbered by theme teardown.
    if (document.title === SKIN_TITLE) document.title = originalTitle
  }, 'ui-claude-orange: Claude Orange chrome')
}
