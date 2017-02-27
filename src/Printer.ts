import * as utils from "utils"

import {Layer} from "Layer"
import {Context} from "Context"
import {BaseClass} from "BaseClass"


type BaseClassOptions = {
	height?: number
	prefix?: string
}

export class Printer extends BaseClass<null> {

	private _context = new Context("print")
	private _layer?: Layer
	private _lines: string[] = []
	private _properties = {
		height: 300,
		prefix: "» "
	}

	readonly print = (...args) => {

		if (!this._layer) {
			this._context.run(this._setup)
		}

		this._context.run(() => {
			const line = new Layer({
				parent: this._layer,
				text: this._properties.prefix + utils.inspect.inspectAll(...args),
				styles: {
					position: "relative",
					display: "block-inline",
					font: "12px/1.35em Menlo",
					margin: "4px 8px",
					width: "auto",
					height: "auto"
				}
			})
		})



	}

	private _setup = () => {

		const background = new Layer({
			x: 0,
			y: window.innerHeight - this._properties.height,
			width: window.innerWidth,
			height: this._properties.height,
			backgroundColor: "white",
			styles: {
				"font": "12px/1.35em Menlo, Consolas, monospace",
				"color": "rgba(0, 0, 0, .7)",
				"border-top": "1px solid #d9d9d9",
				overflow: "scroll",
			}
		})

		this._layer = new Layer({
			parent: background,
			width: window.innerWidth,
			height: this._properties.height,
			styles: {
				overflow: "scroll",
				height: "auto"
			}
		})

	}
}

const printer = new Printer()
export const print = printer.print