(function ($hx_exports, $global) { "use strict";
$hx_exports["code"] = $hx_exports["code"] || {};
$hx_exports["database"] = $hx_exports["database"] || {};
$hx_exports["schema"] = $hx_exports["schema"] || {};
$hx_exports["source"] = $hx_exports["source"] || {};
$hx_exports["transform"] = $hx_exports["transform"] || {};
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
class EReg {
	constructor(r,opt) {
		this.r = new RegExp(r,opt.split("u").join(""));
	}
	match(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
}
EReg.__name__ = true;
Object.assign(EReg.prototype, {
	__class__: EReg
});
class HxOverrides {
	static cca(s,index) {
		let x = s.charCodeAt(index);
		if(x != x) {
			return undefined;
		}
		return x;
	}
	static substr(s,pos,len) {
		if(len == null) {
			len = s.length;
		} else if(len < 0) {
			if(pos == 0) {
				len = s.length + len;
			} else {
				return "";
			}
		}
		return s.substr(pos,len);
	}
	static remove(a,obj) {
		let i = a.indexOf(obj);
		if(i == -1) {
			return false;
		}
		a.splice(i,1);
		return true;
	}
	static now() {
		return Date.now();
	}
}
HxOverrides.__name__ = true;
class JsZip {
	static zip(id,foldername) {
		let div = window.document.getElementById(id).firstChild;
		let entries = new haxe_ds_List();
		let i = 0;
		while(i < div.childNodes.length) {
			let codename = div.childNodes.item(i).textContent;
			let code = div.childNodes.item(i + 1).textContent;
			let bytes = haxe_io_Bytes.ofString(code);
			let entry = { fileName : foldername + "/" + codename, fileSize : bytes.length, fileTime : new Date(), compressed : false, dataSize : 0, data : bytes, crc32 : haxe_crypto_Crc32.make(bytes)};
			entries.push(entry);
			i += 2;
		}
		let output = new haxe_io_BytesOutput();
		let zipWriter = new haxe_zip_Writer(output);
		zipWriter.write(entries);
		return haxe_crypto_Base64.encode(output.getBytes());
	}
}
$hx_exports["JsZip"] = JsZip;
JsZip.__name__ = true;
class Lambda {
	static array(it) {
		let a = [];
		let i = $getIterator(it);
		while(i.hasNext()) {
			let i1 = i.next();
			a.push(i1);
		}
		return a;
	}
	static has(it,elt) {
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			if(x1 == elt) {
				return true;
			}
		}
		return false;
	}
	static exists(it,f) {
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			if(f(x1)) {
				return true;
			}
		}
		return false;
	}
	static iter(it,f) {
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			f(x1);
		}
	}
	static filter(it,f) {
		let _g = [];
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			if(f(x1)) {
				_g.push(x1);
			}
		}
		return _g;
	}
	static count(it,pred) {
		let n = 0;
		if(pred == null) {
			let _ = $getIterator(it);
			while(_.hasNext()) {
				let _1 = _.next();
				++n;
			}
		} else {
			let x = $getIterator(it);
			while(x.hasNext()) {
				let x1 = x.next();
				if(pred(x1)) {
					++n;
				}
			}
		}
		return n;
	}
	static find(it,f) {
		let v = $getIterator(it);
		while(v.hasNext()) {
			let v1 = v.next();
			if(f(v1)) {
				return v1;
			}
		}
		return null;
	}
	static findIndex(it,f) {
		let i = 0;
		let v = $getIterator(it);
		while(v.hasNext()) {
			let v1 = v.next();
			if(f(v1)) {
				return i;
			}
			++i;
		}
		return -1;
	}
	static concat(a,b) {
		let l = [];
		let x = $getIterator(a);
		while(x.hasNext()) {
			let x1 = x.next();
			l.push(x1);
		}
		let x1 = $getIterator(b);
		while(x1.hasNext()) {
			let x = x1.next();
			l.push(x);
		}
		return l;
	}
}
Lambda.__name__ = true;
Math.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
	static parseInt(x) {
		if(x != null) {
			let _g = 0;
			let _g1 = x.length;
			while(_g < _g1) {
				let i = _g++;
				let c = x.charCodeAt(i);
				if(c <= 8 || c >= 14 && c != 32 && c != 45) {
					let nc = x.charCodeAt(i + 1);
					let v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
					if(isNaN(v)) {
						return null;
					} else {
						return v;
					}
				}
			}
		}
		return null;
	}
}
Std.__name__ = true;
class StringBuf {
	constructor() {
		this.b = "";
	}
}
StringBuf.__name__ = true;
Object.assign(StringBuf.prototype, {
	__class__: StringBuf
});
class StringTools {
	static htmlEscape(s,quotes) {
		let buf_b = "";
		let _g_offset = 0;
		let _g_s = s;
		while(_g_offset < _g_s.length) {
			let s = _g_s;
			let index = _g_offset++;
			let c = s.charCodeAt(index);
			if(c >= 55296 && c <= 56319) {
				c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
			}
			let c1 = c;
			if(c1 >= 65536) {
				++_g_offset;
			}
			let code = c1;
			switch(code) {
			case 34:
				if(quotes) {
					buf_b += "&quot;";
				} else {
					buf_b += String.fromCodePoint(code);
				}
				break;
			case 38:
				buf_b += "&amp;";
				break;
			case 39:
				if(quotes) {
					buf_b += "&#039;";
				} else {
					buf_b += String.fromCodePoint(code);
				}
				break;
			case 60:
				buf_b += "&lt;";
				break;
			case 62:
				buf_b += "&gt;";
				break;
			default:
				buf_b += String.fromCodePoint(code);
			}
		}
		return buf_b;
	}
	static isSpace(s,pos) {
		let c = HxOverrides.cca(s,pos);
		if(!(c > 8 && c < 14)) {
			return c == 32;
		} else {
			return true;
		}
	}
	static ltrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,r)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,r,l - r);
		} else {
			return s;
		}
	}
	static rtrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,0,l - r);
		} else {
			return s;
		}
	}
	static trim(s) {
		return StringTools.ltrim(StringTools.rtrim(s));
	}
	static replace(s,sub,by) {
		return s.split(sub).join(by);
	}
}
StringTools.__name__ = true;
class UnicodeString {
	static charAt(this1,index) {
		if(index < 0) {
			return "";
		}
		let unicodeOffset = 0;
		let nativeOffset = 0;
		while(nativeOffset < this1.length) {
			let index1 = nativeOffset++;
			let c = this1.charCodeAt(index1);
			if(c >= 55296 && c <= 56319) {
				c = c - 55232 << 10 | this1.charCodeAt(index1 + 1) & 1023;
			}
			let c1 = c;
			if(unicodeOffset == index) {
				return String.fromCodePoint(c1);
			}
			if(c1 >= 65536) {
				++nativeOffset;
			}
			++unicodeOffset;
		}
		return "";
	}
	static get_length(this1) {
		let l = 0;
		let _g_offset = 0;
		let _g_s = this1;
		while(_g_offset < _g_s.length) {
			let s = _g_s;
			let index = _g_offset++;
			let c = s.charCodeAt(index);
			if(c >= 55296 && c <= 56319) {
				c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
			}
			let c1 = c;
			if(c1 >= 65536) {
				++_g_offset;
			}
			let c2 = c1;
			++l;
		}
		return l;
	}
}
class XmlType {
	static toString(this1) {
		switch(this1) {
		case 0:
			return "Element";
		case 1:
			return "PCData";
		case 2:
			return "CData";
		case 3:
			return "Comment";
		case 4:
			return "DocType";
		case 5:
			return "ProcessingInstruction";
		case 6:
			return "Document";
		}
	}
}
class Xml {
	constructor(nodeType) {
		this.nodeType = nodeType;
		this.children = [];
		this.attributeMap = new haxe_ds_StringMap();
	}
	get(att) {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return this.attributeMap.h[att];
	}
	set(att,value) {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		this.attributeMap.h[att] = value;
	}
	attributes() {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return new haxe_ds__$StringMap_StringMapKeyIterator(this.attributeMap.h);
	}
	addChild(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		if(x.parent != null) {
			x.parent.removeChild(x);
		}
		this.children.push(x);
		x.parent = this;
	}
	removeChild(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		if(HxOverrides.remove(this.children,x)) {
			x.parent = null;
			return true;
		}
		return false;
	}
	insertChild(x,pos) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		if(x.parent != null) {
			HxOverrides.remove(x.parent.children,x);
		}
		this.children.splice(pos,0,x);
		x.parent = this;
	}
	toString() {
		return haxe_xml_Printer.print(this);
	}
	static createElement(name) {
		let xml = new Xml(Xml.Element);
		if(xml.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
		}
		xml.nodeName = name;
		return xml;
	}
	static createPCData(data) {
		let xml = new Xml(Xml.PCData);
		if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
		}
		xml.nodeValue = data;
		return xml;
	}
	static createDocument() {
		return new Xml(Xml.Document);
	}
}
Xml.__name__ = true;
Object.assign(Xml.prototype, {
	__class__: Xml
});
class code_Code {
	static extractFieldName(accessorName,prefixLength) {
		if(prefixLength == null) {
			prefixLength = 3;
		}
		return accessorName.charAt(prefixLength).toLowerCase() + HxOverrides.substr(accessorName,prefixLength + 1,null);
	}
	static overrides(set,method) {
		let value;
		if(method.isStatic || set.superset == null) {
			value = false;
		} else if(Lambda.exists(set.superset.methods,function(m) {
			return m.className == method.className;
		})) {
			value = true;
		} else {
			value = code_Code.overrides(set.superset,method);
		}
		return value;
	}
	static getDefaultValue(classType,newArray,nullValue) {
		if(nullValue == null) {
			nullValue = "null";
		}
		let value = "";
		if(HxOverrides.substr(classType,0,5) == "Array") {
			value = newArray;
		} else {
			switch(classType) {
			case "Bool":
				value = "false";
				break;
			case "Double":case "Float":case "Int":
				value = "0";
				break;
			case "String":
				value = "\"\"";
				break;
			default:
				value = nullValue;
			}
		}
		return value;
	}
}
code_Code.__name__ = true;
class code_HaxeCode {
	static generate(diagram) {
		let files = new haxe_ds_StringMap();
		let set = diagram.iterator();
		while(set.hasNext()) {
			let set1 = set.next();
			if(!((set1) instanceof model_Association) || (js_Boot.__cast(set1 , model_Association)).isClass()) {
				let key = set1.className + ".hx";
				let value = code_HaxeCode.generateClass(set1);
				files.h[key] = value;
			}
		}
		return files;
	}
	static generateClass(set) {
		let content = "";
		if(set.isGeneric()) {
			content += "@:generic\n";
		}
		if(set.isInterface) {
			content += "interface " + set.className + (set.isGeneric() ? "<T>" : "") + " {\n";
		} else {
			content += (set.isAbstract ? "abstract " : "") + "class " + set.className + (set.isGeneric() ? "<T> " : " ") + (set.superset != null ? "extends " + set.superset.className + (set.superset.isGeneric() ? "<T> " : " ") : "") + "{\n";
		}
		content += code_HaxeCode.generateFields(set);
		content += code_HaxeCode.generateConstructor(set);
		content += code_HaxeCode.generateMethods(set);
		content += "}\n";
		return content;
	}
	static generateFields(set) {
		let content = "";
		let fields = set.fields;
		let _g = 0;
		while(_g < fields.length) {
			let field = fields[_g];
			++_g;
			content += "\t" + (field.visibility == model_Field.ACCESS_PRIVATE || field.visibility == model_Field.ACCESS_PROTECTED ? "" : "public ") + (field.isStatic ? "static " : "") + "var " + field.className + " : " + code_HaxeCode.getType(field.classType) + ";\n";
		}
		let fields1 = set.navFields;
		let _g1 = 0;
		while(_g1 < fields1.length) {
			let field = fields1[_g1];
			++_g1;
			content += "\t" + (field.visibility == model_Field.ACCESS_PRIVATE || field.visibility == model_Field.ACCESS_PROTECTED ? "" : "public ") + (field.isStatic ? "static " : "") + "var " + field.className + " : " + code_HaxeCode.getType(field.classType) + ";\n";
		}
		return content;
	}
	static generateMethods(set) {
		let content = "";
		let _g = 0;
		let _g1 = [set.accessors,set.methods];
		while(_g < _g1.length) {
			let methods = _g1[_g];
			++_g;
			let _g2 = 0;
			while(_g2 < methods.length) {
				let method = methods[_g2];
				++_g2;
				let content1 = method.isStatic && method.isGeneric();
				let content2 = method.visibility == model_Field.ACCESS_PRIVATE || method.visibility == model_Field.ACCESS_PROTECTED;
				let content3 = method.isStatic ? "static " : "";
				let content4 = code_Code.overrides(set,method) ? "override " : "";
				let content5 = "\n\t" + (content1 ? "@:generic " : "") + (content2 ? "" : "public ") + content3 + content4 + "function " + method.className + (method.isStatic && method.isGeneric() ? "<T>" : "") + "(";
				let _g = [];
				let x = $getIterator(method.params);
				while(x.hasNext()) {
					let x1 = x.next();
					_g.push(x1.className + " : " + code_HaxeCode.getType(x1.classType));
				}
				content += content5 + _g.join(", ") + ")" + (method.classType == "" ? "" : " : " + code_HaxeCode.getType(method.classType)) + " {\n";
				if(HxOverrides.substr(method.className,0,3) == "get" || HxOverrides.substr(method.className,0,3) == "set") {
					let field = set.getFieldCode(code_Code.extractFieldName(method.className));
					if(field != null) {
						if(HxOverrides.substr(method.className,0,3) == "set") {
							content += "\t\tthis." + field.className + " = " + field.className + ";\n";
						}
						content += "\t\treturn this." + field.className + (HxOverrides.substr(field.classType,0,5) == "Array" ? ".copy()" : "") + ";\n";
					}
				} else if(method.params.length == 1 && (HxOverrides.substr(method.className,0,3) == "add" || HxOverrides.substr(method.className,0,6) == "remove")) {
					let field = set.getFieldFromArrayType(method.params[0].classType);
					if(field != null) {
						content += "\t\tthis." + field.className + (HxOverrides.substr(method.className,0,3) == "add" ? ".push(" : ".remove(") + method.params[0].className + ");\n";
						content += "\t\treturn this;\n";
					}
				} else if(method.classType != "") {
					content += "\t\treturn " + code_Code.getDefaultValue(method.classType,"new Array()") + ";\n";
				}
				content += "\t}\n";
			}
		}
		return content;
	}
	static generateConstructor(set) {
		let content = "";
		if(set.constructors.length != 0) {
			let method = set.constructors[0];
			let _g = [];
			let x = $getIterator(method.params);
			while(x.hasNext()) {
				let x1 = x.next();
				_g.push(x1.className + " : " + code_HaxeCode.getType(x1.classType));
			}
			content += "\n\tpublic function new (" + _g.join(", ") + ") {\n";
			if(set.superset != null) {
				let parentFields = Lambda.filter(method.params,function(p) {
					return set.getFieldCode(p.className) == null;
				});
				let _g = [];
				let _g_current = 0;
				let _g_array = parentFields;
				while(_g_current < _g_array.length) {
					let x = _g_array[_g_current++];
					_g.push(x.className);
				}
				content += "\t\tsuper(" + _g.join(", ") + ");\n";
			}
			let _g1 = 0;
			let _g2 = method.params;
			while(_g1 < _g2.length) {
				let param = _g2[_g1];
				++_g1;
				let field = set.getFieldCode(param.className);
				if(field != null) {
					content += "\t\tthis." + field.className + " = " + param.className + ";\n";
				}
			}
			let fields = set.fields;
			let _g3 = 0;
			while(_g3 < fields.length) {
				let field = fields[_g3];
				++_g3;
				if(!field.isStatic && !Lambda.exists(method.params,function(p) {
					return field.className == p.className;
				})) {
					content += "\t\tthis." + field.className + " = " + code_Code.getDefaultValue(field.classType,"new Array()") + ";\n";
				}
			}
			let fields1 = set.navFields;
			let _g4 = 0;
			while(_g4 < fields1.length) {
				let field = fields1[_g4];
				++_g4;
				if(!field.isStatic && !Lambda.exists(method.params,function(p) {
					return field.className == p.className;
				})) {
					content += "\t\tthis." + field.className + " = " + code_Code.getDefaultValue(field.classType,"new Array()") + ";\n";
				}
			}
			content += "\t}\n";
		}
		return content;
	}
	static getType(classType) {
		let languageType = classType;
		if(classType == "Time" || classType == "DateTime") {
			languageType = "Date";
		}
		return languageType;
	}
}
$hx_exports["code"]["HaxeCode"] = code_HaxeCode;
code_HaxeCode.__name__ = true;
class code_JavaCode {
	static generate(diagram) {
		let files = new haxe_ds_StringMap();
		let set = diagram.iterator();
		while(set.hasNext()) {
			let set1 = set.next();
			if(!((set1) instanceof model_Association) || (js_Boot.__cast(set1 , model_Association)).isClass()) {
				let key = set1.className + ".java";
				let value = code_JavaCode.generateClass(set1);
				files.h[key] = value;
			}
		}
		return files;
	}
	static generateClass(set) {
		let content = "";
		content += code_JavaCode.addImports(set);
		if(set.isInterface) {
			content += "public interface " + set.className + (set.isGeneric() ? "<T>" : "") + " {\n";
		} else {
			content += "public " + (set.isAbstract ? "abstract " : "") + "class " + set.className + (set.isGeneric() ? "<T> " : " ") + (set.superset != null ? "extends " + set.superset.className + (set.superset.isGeneric() ? "<T> " : " ") : "") + "{\n";
		}
		content += code_JavaCode.generateFields(set);
		content += code_JavaCode.generateConstructors(set);
		content += code_JavaCode.generateMethods(set);
		content += "}\n";
		return content;
	}
	static addImports(set) {
		let imports = [];
		let fields = set.fields;
		let _g = 0;
		while(_g < fields.length) {
			let field = fields[_g];
			++_g;
			if(HxOverrides.substr(field.classType,0,5) == "Array" && !Lambda.has(imports,"java.util.ArrayList")) {
				imports.push("java.util.ArrayList");
			} else if(HxOverrides.substr(field.classType,0,4) == "Date" && !Lambda.has(imports,"java.time.LocalDate")) {
				imports.push("java.time.LocalDate");
			} else if(HxOverrides.substr(field.classType,0,4) == "Time" && !Lambda.has(imports,"java.time.LocalTime")) {
				imports.push("java.time.LocalTime");
			} else if(HxOverrides.substr(field.classType,0,8) == "DateTime" && !Lambda.has(imports,"java.time.LocalDateTime")) {
				imports.push("java.time.LocalDateTime");
			}
		}
		let fields1 = set.navFields;
		let _g1 = 0;
		while(_g1 < fields1.length) {
			let field = fields1[_g1];
			++_g1;
			if(HxOverrides.substr(field.classType,0,5) == "Array" && !Lambda.has(imports,"java.util.ArrayList")) {
				imports.push("java.util.ArrayList");
			} else if(HxOverrides.substr(field.classType,0,4) == "Date" && !Lambda.has(imports,"java.time.LocalDate")) {
				imports.push("java.time.LocalDate");
			} else if(HxOverrides.substr(field.classType,0,4) == "Time" && !Lambda.has(imports,"java.time.LocalTime")) {
				imports.push("java.time.LocalTime");
			} else if(HxOverrides.substr(field.classType,0,8) == "DateTime" && !Lambda.has(imports,"java.time.LocalDateTime")) {
				imports.push("java.time.LocalDateTime");
			}
		}
		let content = "";
		let _g2 = 0;
		while(_g2 < imports.length) {
			let impt = imports[_g2];
			++_g2;
			content += "import " + impt + ";\n";
		}
		if(imports.length != 0) {
			content += "\n";
		}
		return content;
	}
	static generateFields(set) {
		let content = "";
		let fields = set.fields;
		let _g = 0;
		while(_g < fields.length) {
			let field = fields[_g];
			++_g;
			content += "\t" + (field.visibility == model_Field.ACCESS_PRIVATE ? "" : field.visibility == model_Field.ACCESS_PROTECTED ? "protected " : "public ") + (field.isStatic ? "static " : "") + code_JavaCode.getType(field.classType) + " " + field.className + ";\n";
		}
		let fields1 = set.navFields;
		let _g1 = 0;
		while(_g1 < fields1.length) {
			let field = fields1[_g1];
			++_g1;
			content += "\t" + (field.visibility == model_Field.ACCESS_PRIVATE ? "" : field.visibility == model_Field.ACCESS_PROTECTED ? "protected " : "public ") + (field.isStatic ? "static " : "") + code_JavaCode.getType(field.classType) + " " + field.className + ";\n";
		}
		return content;
	}
	static generateMethods(set) {
		let content = "";
		let _g = 0;
		let _g1 = [set.accessors,set.methods];
		while(_g < _g1.length) {
			let methods = _g1[_g];
			++_g;
			let _g2 = 0;
			while(_g2 < methods.length) {
				let method = methods[_g2];
				++_g2;
				if(HxOverrides.substr(method.className,0,3) == "get" && HxOverrides.substr(method.classType,0,5) == "Array") {
					content += "\n\t@SuppressWarnings(\"unchecked\")";
				}
				if(code_Code.overrides(set,method)) {
					content += "\n\t@Override";
				}
				let content1 = method.visibility == model_Field.ACCESS_PRIVATE ? "" : method.visibility == model_Field.ACCESS_PROTECTED ? "protected " : "public ";
				let content2 = method.isStatic ? "static " : "";
				let content3 = method.isStatic && method.isGeneric();
				let content4 = method.classType == "" ? "void " : code_JavaCode.getType(method.classType) + " ";
				let content5 = "\n\t" + content1 + content2 + (content3 ? "<T>" : "") + content4 + method.className + "(";
				let _g = [];
				let x = $getIterator(method.params);
				while(x.hasNext()) {
					let x1 = x.next();
					_g.push(code_JavaCode.getType(x1.classType) + " " + x1.className);
				}
				content += content5 + _g.join(", ") + ") {\n";
				if(HxOverrides.substr(method.className,0,3) == "get" || HxOverrides.substr(method.className,0,3) == "set") {
					let field = set.getFieldCode(code_Code.extractFieldName(method.className));
					if(field != null) {
						if(HxOverrides.substr(method.className,0,3) == "set") {
							content += "\t\tthis." + field.className + " = " + field.className + ";\n";
						}
						if(HxOverrides.substr(field.classType,0,5) == "Array") {
							content += "\t\treturn (" + code_JavaCode.getType(field.classType) + ") this." + field.className + ".clone();\n";
						} else {
							content += "\t\treturn this." + field.className + ";\n";
						}
					}
				} else if(method.params.length == 1 && (HxOverrides.substr(method.className,0,3) == "add" || HxOverrides.substr(method.className,0,6) == "remove")) {
					let field = set.getFieldFromArrayType(method.params[0].classType);
					if(field != null) {
						content += "\t\tthis." + field.className + (HxOverrides.substr(method.className,0,3) == "add" ? ".add(" : ".remove(") + method.params[0].className + ");\n";
						content += "\t\treturn this;\n";
					}
				} else if(method.classType != "") {
					content += "\t\treturn " + code_Code.getDefaultValue(method.classType,"new " + code_JavaCode.getType(method.classType) + "()") + ";\n";
				}
				content += "\t}\n";
			}
		}
		return content;
	}
	static generateConstructors(set) {
		let content = "";
		let _g = 0;
		let _g1 = set.constructors;
		while(_g < _g1.length) {
			let method = _g1[_g];
			++_g;
			let content1 = "\n\tpublic " + set.className + "(";
			let _g2 = [];
			let x = $getIterator(method.params);
			while(x.hasNext()) {
				let x1 = x.next();
				_g2.push(code_JavaCode.getType(x1.classType) + " " + x1.className);
			}
			content += content1 + _g2.join(", ") + ") {\n";
			if(set.superset != null) {
				let parentFields = Lambda.filter(method.params,function(p) {
					return set.getFieldCode(p.className) == null;
				});
				let _g = [];
				let _g_current = 0;
				let _g_array = parentFields;
				while(_g_current < _g_array.length) {
					let x = _g_array[_g_current++];
					_g.push(x.className);
				}
				content += "\t\tsuper(" + _g.join(", ") + ");\n";
			}
			let _g3 = 0;
			let _g4 = method.params;
			while(_g3 < _g4.length) {
				let param = _g4[_g3];
				++_g3;
				let field = set.getFieldCode(param.className);
				if(field != null) {
					content += "\t\tthis." + field.className + " = " + param.className + ";\n";
				}
			}
			let fields = set.fields;
			let _g5 = 0;
			while(_g5 < fields.length) {
				let field = fields[_g5];
				++_g5;
				if(!field.isStatic && !Lambda.exists(method.params,function(p) {
					return field.className == p.className;
				})) {
					content += "\t\tthis." + field.className + " = " + code_Code.getDefaultValue(field.classType,"new " + code_JavaCode.getType(field.classType) + "()") + ";\n";
				}
			}
			let fields1 = set.navFields;
			let _g6 = 0;
			while(_g6 < fields1.length) {
				let field = fields1[_g6];
				++_g6;
				if(!field.isStatic && !Lambda.exists(method.params,function(p) {
					return field.className == p.className;
				})) {
					content += "\t\tthis." + field.className + " = " + code_Code.getDefaultValue(field.classType,"new " + code_JavaCode.getType(field.classType) + "()") + ";\n";
				}
			}
			content += "\t}\n";
		}
		return content;
	}
	static getType(classType) {
		let languageType = classType;
		if(HxOverrides.substr(classType,0,5) == "Array") {
			languageType = "ArrayList" + HxOverrides.substr(classType,5,null);
		} else if(classType == "Int" || classType == "FLoat" || classType == "Double") {
			languageType = classType.toLowerCase();
		} else if(classType == "Bool") {
			languageType = "boolean";
		}
		return languageType;
	}
}
$hx_exports["code"]["JavaCode"] = code_JavaCode;
code_JavaCode.__name__ = true;
class code_PythonCode {
	static generate(diagram) {
		let files = new haxe_ds_StringMap();
		let set = diagram.iterator();
		while(set.hasNext()) {
			let set1 = set.next();
			if(!((set1) instanceof model_Association) || (js_Boot.__cast(set1 , model_Association)).isClass()) {
				let key = set1.className.toLowerCase() + ".py";
				let value = code_PythonCode.generateClass(set1);
				files.h[key] = value;
			}
		}
		return files;
	}
	static generateClass(set) {
		let content = "";
		content += code_PythonCode.addImports(set);
		if(!set.isInterface) {
			content += "class " + set.className + (set.superset != null ? "(" + set.superset.className + ")" : "") + ":\n";
		}
		content += code_PythonCode.generateStaticFields(set);
		content += code_PythonCode.generateConstructor(set);
		content += code_PythonCode.generateMethods(set);
		content += "\n";
		return content;
	}
	static addImports(set) {
		let imports = [];
		imports.push("from __future__ import annotations");
		let _g = 0;
		let _g1 = [set.fields,set.navFields];
		while(_g < _g1.length) {
			let fields = _g1[_g];
			++_g;
			let _g2 = 0;
			while(_g2 < fields.length) {
				let field = fields[_g2];
				++_g2;
				if(HxOverrides.substr(field.classType,0,5) == "Array" && !Lambda.has(imports,"from typing import List")) {
					imports.push("from typing import List");
				} else if(HxOverrides.substr(field.classType,0,4) == "Date" && !Lambda.has(imports,"from datetime import date")) {
					imports.push("from datetime import date");
				} else if(HxOverrides.substr(field.classType,0,4) == "Time" && !Lambda.has(imports,"from datetime import time")) {
					imports.push("from datetime import time");
				} else if(HxOverrides.substr(field.classType,0,8) == "DateTime" && !Lambda.has(imports,"from datetime import datetime")) {
					imports.push("from datetime import datetime");
				} else if(field.classType != "T" && code_PythonCode.getType(field.classType).charAt(0) == code_PythonCode.getType(field.classType).charAt(0).toUpperCase() && field.classType != set.className && !Lambda.has(imports,"from " + field.classType.toLowerCase() + " import " + field.classType)) {
					imports.push("from " + field.classType.toLowerCase() + " import " + field.classType);
				}
			}
		}
		if(set.superset != null && !Lambda.has(imports,"from " + set.superset.className.toLowerCase() + " import " + set.superset.className)) {
			imports.push("from " + set.superset.className.toLowerCase() + " import " + set.superset.className);
		}
		if(Lambda.exists(set.fields,function(f) {
			if(f.classType.indexOf("<T>") == -1) {
				return f.classType == "T";
			} else {
				return true;
			}
		}) || Lambda.exists(set.methods,function(m) {
			return m.isGeneric();
		})) {
			imports.push("from typing import TypeVar");
			imports.push("T = TypeVar(\"T\")");
		}
		let content = imports.join("\n") + "\n\n";
		return content;
	}
	static generateStaticFields(set) {
		let content = "";
		let addNewLine = false;
		let _g = 0;
		let _g1 = set.fields;
		while(_g < _g1.length) {
			let field = _g1[_g];
			++_g;
			if(field.isStatic) {
				content += "\t" + (field.visibility == model_Field.ACCESS_PRIVATE || field.visibility == model_Field.ACCESS_PROTECTED ? "_" : "") + field.className + " = " + code_Code.getDefaultValue(field.classType,"None") + "\n";
				addNewLine = true;
			}
		}
		if(addNewLine) {
			content += "\n";
		}
		return content;
	}
	static generateMethods(set) {
		let content = "";
		let _g = 0;
		let _g1 = [set.accessors,set.methods];
		while(_g < _g1.length) {
			let methods = _g1[_g];
			++_g;
			let _g2 = 0;
			while(_g2 < methods.length) {
				let method = methods[_g2];
				++_g2;
				let _g = [];
				let x = $getIterator(method.params);
				while(x.hasNext()) {
					let x1 = x.next();
					_g.push(x1.className + " : " + code_PythonCode.getType(x1.classType));
				}
				let params = _g;
				if(!method.isStatic) {
					params.splice(0,0,"self");
				}
				content += "\n\t" + (method.visibility == model_Field.ACCESS_PRIVATE || method.visibility == model_Field.ACCESS_PROTECTED ? "_" : "") + "def " + method.className + "(" + params.join(", ") + ")" + (method.classType == "" ? "" : " -> " + code_PythonCode.getType(method.classType)) + ":\n";
				if(HxOverrides.substr(method.className,0,3) == "get" || HxOverrides.substr(method.className,0,3) == "set") {
					let field = set.getFieldCode(code_Code.extractFieldName(method.className));
					if(field != null) {
						if(HxOverrides.substr(method.className,0,3) == "set") {
							content += "\t\tself." + (field.visibility == model_Field.ACCESS_PRIVATE || field.visibility == model_Field.ACCESS_PROTECTED ? "_" : "") + field.className + " = " + field.className + "\n";
						}
						content += "\t\treturn self." + (field.visibility == model_Field.ACCESS_PRIVATE || field.visibility == model_Field.ACCESS_PROTECTED ? "_" : "") + field.className + (HxOverrides.substr(field.classType,0,5) == "Array" ? ".copy()" : "") + "\n";
					}
				} else if(method.params.length == 1 && (HxOverrides.substr(method.className,0,3) == "add" || HxOverrides.substr(method.className,0,6) == "remove")) {
					let field = set.getFieldFromArrayType(method.params[0].classType);
					if(field != null) {
						content += "\t\tself." + (field.visibility == model_Field.ACCESS_PRIVATE || field.visibility == model_Field.ACCESS_PROTECTED ? "_" : "") + field.className + (HxOverrides.substr(method.className,0,3) == "add" ? ".append(" : ".remove(") + method.params[0].className + ")\n";
						content += "\t\treturn self;\n";
					}
				} else if(method.classType != "") {
					content += "\t\treturn " + code_Code.getDefaultValue(method.classType,"None") + "\n";
				} else {
					content += "\t\tpass\n";
				}
			}
		}
		return content;
	}
	static generateConstructor(set) {
		let content = "";
		if(set.constructors.length != 0) {
			let emptyConstructor = true;
			let method = set.constructors[0];
			let _g = [];
			let x = $getIterator(method.params);
			while(x.hasNext()) {
				let x1 = x.next();
				_g.push(x1.className + " : " + code_PythonCode.getType(x1.classType));
			}
			let params = _g;
			params.splice(0,0,"self");
			content += "\tdef __init__ (" + params.join(", ") + "):\n";
			if(set.superset != null) {
				let parentFields = Lambda.filter(method.params,function(p) {
					return set.getFieldCode(p.className) == null;
				});
				let _g = [];
				let _g_current = 0;
				let _g_array = parentFields;
				while(_g_current < _g_array.length) {
					let x = _g_array[_g_current++];
					_g.push(x.className);
				}
				content += "\t\tsuper().__init__(" + _g.join(", ") + ")\n";
				emptyConstructor = false;
			}
			let _g1 = 0;
			let _g2 = method.params;
			while(_g1 < _g2.length) {
				let param = _g2[_g1];
				++_g1;
				let field = set.getFieldCode(param.className);
				if(field != null) {
					content += "\t\tself." + (field.visibility == model_Field.ACCESS_PRIVATE || field.visibility == model_Field.ACCESS_PROTECTED ? "_" : "") + field.className + " = " + param.className + "\n";
					emptyConstructor = false;
				}
			}
			let fields = set.fields;
			let _g3 = 0;
			while(_g3 < fields.length) {
				let field = fields[_g3];
				++_g3;
				if(!field.isStatic && !Lambda.exists(method.params,function(p) {
					return field.className == p.className;
				})) {
					content += "\t\tself." + (field.visibility == model_Field.ACCESS_PRIVATE || field.visibility == model_Field.ACCESS_PROTECTED ? "_" : "") + field.className + " = " + code_Code.getDefaultValue(field.classType,"[]","None") + "\n";
					emptyConstructor = false;
				}
			}
			let fields1 = set.navFields;
			let _g4 = 0;
			while(_g4 < fields1.length) {
				let field = fields1[_g4];
				++_g4;
				if(!field.isStatic && !Lambda.exists(method.params,function(p) {
					return field.className == p.className;
				})) {
					content += "\t\tself." + (field.visibility == model_Field.ACCESS_PRIVATE || field.visibility == model_Field.ACCESS_PROTECTED ? "_" : "") + field.className + " = " + code_Code.getDefaultValue(field.classType,"[]","None") + "\n";
					emptyConstructor = false;
				}
			}
			if(emptyConstructor) {
				content += "\t\tpass\n";
			}
		}
		return content;
	}
	static getType(classType) {
		let languageType = classType;
		if(HxOverrides.substr(classType,0,5) == "Array") {
			languageType = "List[" + HxOverrides.substr(classType,6,classType.length - 7) + "]";
		} else if(classType == "String") {
			languageType = "str";
		} else if(classType == "Int" || classType == "FLoat" || classType == "Double" || classType == "Date" || classType == "Time" || classType == "DateTime") {
			languageType = classType.toLowerCase();
		}
		return languageType;
	}
}
$hx_exports["code"]["PythonCode"] = code_PythonCode;
code_PythonCode.__name__ = true;
class database_DBMariaDB {
	static generateSQL(mld) {
		let sql = "";
		let h = mld.relations.h;
		let r_h = h;
		let r_keys = Object.keys(h);
		let r_length = r_keys.length;
		let r_current = 0;
		while(r_current < r_length) {
			let r = r_h[r_keys[r_current++]];
			let hasPK = false;
			sql += "CREATE TABLE IF NOT EXISTS " + r.name + " (";
			let first = true;
			let _g = 0;
			let _g1 = r.fields;
			while(_g < _g1.length) {
				let f = _g1[_g];
				++_g;
				let fk = Lambda.find(r.foreignKeys,function(fk) {
					return fk.name == f.name;
				});
				if(first) {
					first = false;
				} else {
					sql += ", ";
				}
				sql += f.name + " ";
				if(f.type.toUpperCase() == "COUNTER") {
					if(r.key.length == 1 && r.key[0] == f.name) {
						sql += "INT PRIMARY KEY AUTO_INCREMENT";
						hasPK = true;
					} else {
						sql += "INT";
					}
				} else {
					sql += f.dbType;
				}
				if(!hasPK && r.key.length == 1 && r.key[0] == f.name) {
					sql += " PRIMARY KEY";
				}
				if(fk != null) {
					sql += " REFERENCES " + fk.relation.name + "(" + fk.key + ")";
				}
			}
			if(r.key.length != 1) {
				sql += ", PRIMARY KEY(" + r.key.join(",") + ")";
			}
			sql += ");\n";
		}
		return sql;
	}
	static formatSQL(mld) {
		return StringTools.replace(StringTools.replace(StringTools.replace(database_DBMariaDB.generateSQL(mld),", ",",\n    ")," ("," (\n    "),");","\n);\n");
	}
}
$hx_exports["database"]["DBMariaDB"] = database_DBMariaDB;
database_DBMariaDB.__name__ = true;
class database_DBPostgreSQL {
	static generateSQL(mld) {
		let sql = "";
		let h = mld.relations.h;
		let r_h = h;
		let r_keys = Object.keys(h);
		let r_length = r_keys.length;
		let r_current = 0;
		while(r_current < r_length) {
			let r = r_h[r_keys[r_current++]];
			let hasPK = false;
			sql += "CREATE TABLE IF NOT EXISTS " + r.name + " (";
			let first = true;
			let _g = 0;
			let _g1 = r.fields;
			while(_g < _g1.length) {
				let f = _g1[_g];
				++_g;
				let fk = Lambda.find(r.foreignKeys,function(fk) {
					return fk.name == f.name;
				});
				if(first) {
					first = false;
				} else {
					sql += ", ";
				}
				sql += f.name + " ";
				if(f.type.toUpperCase() == "COUNTER") {
					if(r.key.length == 1 && r.key[0] == f.name) {
						sql += "SERIAL PRIMARY KEY";
						hasPK = true;
					} else {
						sql += "INT";
					}
				} else {
					sql += f.dbType;
				}
				if(!hasPK && r.key.length == 1 && r.key[0] == f.name) {
					sql += " PRIMARY KEY";
				}
				if(fk != null) {
					sql += " REFERENCES " + fk.relation.name + "(" + fk.key + ")";
				}
			}
			if(r.key.length != 1) {
				sql += ", PRIMARY KEY(" + r.key.join(",") + ")";
			}
			sql += ");\n";
		}
		return sql;
	}
	static formatSQL(mld) {
		return StringTools.replace(StringTools.replace(StringTools.replace(database_DBPostgreSQL.generateSQL(mld),", ",",\n    ")," ("," (\n    "),");","\n);\n");
	}
}
$hx_exports["database"]["DBPostgreSQL"] = database_DBPostgreSQL;
database_DBPostgreSQL.__name__ = true;
class database_DBSqlite {
	static generateSQL(mld) {
		let sql = "";
		let h = mld.relations.h;
		let r_h = h;
		let r_keys = Object.keys(h);
		let r_length = r_keys.length;
		let r_current = 0;
		while(r_current < r_length) {
			let r = r_h[r_keys[r_current++]];
			let hasPK = false;
			sql += "CREATE TABLE IF NOT EXISTS " + r.name + " (";
			let first = true;
			let _g = 0;
			let _g1 = r.fields;
			while(_g < _g1.length) {
				let f = _g1[_g];
				++_g;
				let fk = Lambda.find(r.foreignKeys,function(fk) {
					return fk.name == f.name;
				});
				if(first) {
					first = false;
				} else {
					sql += ", ";
				}
				sql += f.name + " ";
				if(f.type.toUpperCase() == "COUNTER") {
					if(r.key.length == 1 && r.key[0] == f.name) {
						sql += "INTEGER PRIMARY KEY AUTOINCREMENT";
						hasPK = true;
					} else {
						sql += "INT";
					}
				} else {
					sql += f.dbType;
				}
				if(!hasPK && r.key.length == 1 && r.key[0] == f.name) {
					sql += " PRIMARY KEY";
				}
				if(fk != null) {
					sql += " REFERENCES " + fk.relation.name + "(" + fk.key + ")";
				}
			}
			if(r.key.length != 1) {
				sql += ", PRIMARY KEY(" + r.key.join(",") + ")";
			}
			sql += ");\n";
		}
		return sql;
	}
	static formatSQL(mld) {
		return StringTools.replace(StringTools.replace(StringTools.replace(database_DBSqlite.generateSQL(mld),", ",",\n    ")," ("," (\n    "),");","\n);\n");
	}
}
$hx_exports["database"]["DBSqlite"] = database_DBSqlite;
database_DBSqlite.__name__ = true;
class haxe_IMap {
}
haxe_IMap.__name__ = true;
haxe_IMap.__isInterface__ = true;
class haxe_Exception extends Error {
	constructor(message,previous,native) {
		super(message);
		this.message = message;
		this.__previousException = previous;
		this.__nativeException = native != null ? native : this;
	}
	unwrap() {
		return this.__nativeException;
	}
	toString() {
		return this.get_message();
	}
	get_message() {
		return this.message;
	}
	get_native() {
		return this.__nativeException;
	}
	static caught(value) {
		if(((value) instanceof haxe_Exception)) {
			return value;
		} else if(((value) instanceof Error)) {
			return new haxe_Exception(value.message,null,value);
		} else {
			return new haxe_ValueException(value,null,value);
		}
	}
	static thrown(value) {
		if(((value) instanceof haxe_Exception)) {
			return value.get_native();
		} else if(((value) instanceof Error)) {
			return value;
		} else {
			let e = new haxe_ValueException(value);
			return e;
		}
	}
}
haxe_Exception.__name__ = true;
haxe_Exception.__super__ = Error;
Object.assign(haxe_Exception.prototype, {
	__class__: haxe_Exception
});
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native);
		this.value = value;
	}
	unwrap() {
		return this.value;
	}
}
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
Object.assign(haxe_ValueException.prototype, {
	__class__: haxe_ValueException
});
class haxe_io_Bytes {
	constructor(data) {
		this.length = data.byteLength;
		this.b = new Uint8Array(data);
		this.b.bufferValue = data;
		data.hxBytes = this;
		data.bytes = this.b;
	}
	getString(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		let s = "";
		let b = this.b;
		let i = pos;
		let max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			let debug = pos > 0;
			while(i < max) {
				let c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					let code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					let c2 = b[i++];
					let code = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else {
					let c2 = b[i++];
					let c3 = b[i++];
					let u = (c & 15) << 18 | (c2 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				let c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	toString() {
		return this.getString(0,this.length);
	}
	static ofString(s,encoding) {
		if(encoding == haxe_io_Encoding.RawNative) {
			let buf = new Uint8Array(s.length << 1);
			let _g = 0;
			let _g1 = s.length;
			while(_g < _g1) {
				let i = _g++;
				let c = s.charCodeAt(i);
				buf[i << 1] = c & 255;
				buf[i << 1 | 1] = c >> 8;
			}
			return new haxe_io_Bytes(buf.buffer);
		}
		let a = [];
		let i = 0;
		while(i < s.length) {
			let c = s.charCodeAt(i++);
			if(55296 <= c && c <= 56319) {
				c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
			}
			if(c <= 127) {
				a.push(c);
			} else if(c <= 2047) {
				a.push(192 | c >> 6);
				a.push(128 | c & 63);
			} else if(c <= 65535) {
				a.push(224 | c >> 12);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			} else {
				a.push(240 | c >> 18);
				a.push(128 | c >> 12 & 63);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			}
		}
		return new haxe_io_Bytes(new Uint8Array(a).buffer);
	}
}
haxe_io_Bytes.__name__ = true;
Object.assign(haxe_io_Bytes.prototype, {
	__class__: haxe_io_Bytes
});
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
class haxe_crypto_Base64 {
	static encode(bytes,complement) {
		if(complement == null) {
			complement = true;
		}
		let str = new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).encodeBytes(bytes).toString();
		if(complement) {
			switch(bytes.length % 3) {
			case 1:
				str += "==";
				break;
			case 2:
				str += "=";
				break;
			default:
			}
		}
		return str;
	}
}
haxe_crypto_Base64.__name__ = true;
class haxe_crypto_BaseCode {
	constructor(base) {
		let len = base.length;
		let nbits = 1;
		while(len > 1 << nbits) ++nbits;
		if(nbits > 8 || len != 1 << nbits) {
			throw haxe_Exception.thrown("BaseCode : base length must be a power of two.");
		}
		this.base = base;
		this.nbits = nbits;
	}
	encodeBytes(b) {
		let nbits = this.nbits;
		let base = this.base;
		let size = b.length * 8 / nbits | 0;
		let out = new haxe_io_Bytes(new ArrayBuffer(size + (b.length * 8 % nbits == 0 ? 0 : 1)));
		let buf = 0;
		let curbits = 0;
		let mask = (1 << nbits) - 1;
		let pin = 0;
		let pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.b[pin++];
			}
			curbits -= nbits;
			out.b[pout++] = base.b[buf >> curbits & mask];
		}
		if(curbits > 0) {
			out.b[pout++] = base.b[buf << nbits - curbits & mask];
		}
		return out;
	}
}
haxe_crypto_BaseCode.__name__ = true;
Object.assign(haxe_crypto_BaseCode.prototype, {
	__class__: haxe_crypto_BaseCode
});
class haxe_crypto_Crc32 {
	static make(data) {
		let c_crc = -1;
		let b = data.b.bufferValue;
		let _g = 0;
		let _g1 = data.length;
		while(_g < _g1) {
			let i = _g++;
			let tmp = (c_crc ^ b.bytes[i]) & 255;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			c_crc = c_crc >>> 8 ^ tmp;
		}
		return c_crc ^ -1;
	}
}
haxe_crypto_Crc32.__name__ = true;
class haxe_ds_List {
	constructor() {
		this.length = 0;
	}
	add(item) {
		let x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	push(item) {
		let x = new haxe_ds__$List_ListNode(item,this.h);
		this.h = x;
		if(this.q == null) {
			this.q = x;
		}
		this.length++;
	}
}
haxe_ds_List.__name__ = true;
Object.assign(haxe_ds_List.prototype, {
	__class__: haxe_ds_List
});
class haxe_ds__$List_ListNode {
	constructor(item,next) {
		this.item = item;
		this.next = next;
	}
}
haxe_ds__$List_ListNode.__name__ = true;
Object.assign(haxe_ds__$List_ListNode.prototype, {
	__class__: haxe_ds__$List_ListNode
});
class haxe_ds_StringMap {
	constructor() {
		this.h = Object.create(null);
	}
	iterator() {
		return new haxe_ds__$StringMap_StringMapValueIterator(this.h);
	}
}
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
Object.assign(haxe_ds_StringMap.prototype, {
	__class__: haxe_ds_StringMap
});
class haxe_ds__$StringMap_StringMapKeyIterator {
	constructor(h) {
		this.h = h;
		this.keys = Object.keys(h);
		this.length = this.keys.length;
		this.current = 0;
	}
	hasNext() {
		return this.current < this.length;
	}
	next() {
		return this.keys[this.current++];
	}
}
haxe_ds__$StringMap_StringMapKeyIterator.__name__ = true;
Object.assign(haxe_ds__$StringMap_StringMapKeyIterator.prototype, {
	__class__: haxe_ds__$StringMap_StringMapKeyIterator
});
class haxe_ds__$StringMap_StringMapValueIterator {
	constructor(h) {
		this.h = h;
		this.keys = Object.keys(h);
		this.length = this.keys.length;
		this.current = 0;
	}
	hasNext() {
		return this.current < this.length;
	}
	next() {
		return this.h[this.keys[this.current++]];
	}
}
haxe_ds__$StringMap_StringMapValueIterator.__name__ = true;
Object.assign(haxe_ds__$StringMap_StringMapValueIterator.prototype, {
	__class__: haxe_ds__$StringMap_StringMapValueIterator
});
class haxe_exceptions_PosException extends haxe_Exception {
	constructor(message,previous,pos) {
		super(message,previous);
		if(pos == null) {
			this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
		} else {
			this.posInfos = pos;
		}
	}
	toString() {
		return "" + super.toString() + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
}
haxe_exceptions_PosException.__name__ = true;
haxe_exceptions_PosException.__super__ = haxe_Exception;
Object.assign(haxe_exceptions_PosException.prototype, {
	__class__: haxe_exceptions_PosException
});
class haxe_exceptions_NotImplementedException extends haxe_exceptions_PosException {
	constructor(message,previous,pos) {
		if(message == null) {
			message = "Not implemented";
		}
		super(message,previous,pos);
	}
}
haxe_exceptions_NotImplementedException.__name__ = true;
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
Object.assign(haxe_exceptions_NotImplementedException.prototype, {
	__class__: haxe_exceptions_NotImplementedException
});
class haxe_io_BytesBuffer {
	constructor() {
		this.pos = 0;
		this.size = 0;
	}
	addByte(byte) {
		if(this.pos == this.size) {
			this.grow(1);
		}
		this.view.setUint8(this.pos++,byte);
	}
	addBytes(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.pos + len > this.size) {
			this.grow(len);
		}
		if(this.size == 0) {
			return;
		}
		let sub = new Uint8Array(src.b.buffer,src.b.byteOffset + pos,len);
		this.u8.set(sub,this.pos);
		this.pos += len;
	}
	grow(delta) {
		let req = this.pos + delta;
		let nsize = this.size == 0 ? 16 : this.size;
		while(nsize < req) nsize = nsize * 3 >> 1;
		let nbuf = new ArrayBuffer(nsize);
		let nu8 = new Uint8Array(nbuf);
		if(this.size > 0) {
			nu8.set(this.u8);
		}
		this.size = nsize;
		this.buffer = nbuf;
		this.u8 = nu8;
		this.view = new DataView(this.buffer);
	}
	getBytes() {
		if(this.size == 0) {
			return new haxe_io_Bytes(new ArrayBuffer(0));
		}
		let b = new haxe_io_Bytes(this.buffer);
		b.length = this.pos;
		return b;
	}
}
haxe_io_BytesBuffer.__name__ = true;
Object.assign(haxe_io_BytesBuffer.prototype, {
	__class__: haxe_io_BytesBuffer
});
class haxe_io_Output {
	writeByte(c) {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Output.hx", lineNumber : 47, className : "haxe.io.Output", methodName : "writeByte"});
	}
	writeBytes(s,pos,len) {
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		let b = s.b;
		let k = len;
		while(k > 0) {
			this.writeByte(b[pos]);
			++pos;
			--k;
		}
		return len;
	}
	write(s) {
		let l = s.length;
		let p = 0;
		while(l > 0) {
			let k = this.writeBytes(s,p,l);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			p += k;
			l -= k;
		}
	}
	writeFullBytes(s,pos,len) {
		while(len > 0) {
			let k = this.writeBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	writeUInt16(x) {
		if(x < 0 || x >= 65536) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		if(this.bigEndian) {
			this.writeByte(x >> 8);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8);
		}
	}
	writeInt32(x) {
		if(this.bigEndian) {
			this.writeByte(x >>> 24);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >>> 24);
		}
	}
	writeString(s,encoding) {
		let b = haxe_io_Bytes.ofString(s,encoding);
		this.writeFullBytes(b,0,b.length);
	}
}
haxe_io_Output.__name__ = true;
Object.assign(haxe_io_Output.prototype, {
	__class__: haxe_io_Output
});
class haxe_io_BytesOutput extends haxe_io_Output {
	constructor() {
		super();
		this.b = new haxe_io_BytesBuffer();
	}
	writeByte(c) {
		this.b.addByte(c);
	}
	writeBytes(buf,pos,len) {
		this.b.addBytes(buf,pos,len);
		return len;
	}
	getBytes() {
		return this.b.getBytes();
	}
}
haxe_io_BytesOutput.__name__ = true;
haxe_io_BytesOutput.__super__ = haxe_io_Output;
Object.assign(haxe_io_BytesOutput.prototype, {
	__class__: haxe_io_BytesOutput
});
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
haxe_iterators_ArrayIterator.__name__ = true;
Object.assign(haxe_iterators_ArrayIterator.prototype, {
	__class__: haxe_iterators_ArrayIterator
});
class haxe_xml_Printer {
	constructor(pretty) {
		this.output = new StringBuf();
		this.pretty = pretty;
	}
	writeNode(value,tabs) {
		switch(value.nodeType) {
		case 0:
			this.output.b += Std.string(tabs + "<");
			if(value.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string(value.nodeName);
			let attribute = value.attributes();
			while(attribute.hasNext()) {
				let attribute1 = attribute.next();
				this.output.b += Std.string(" " + attribute1 + "=\"");
				let input = StringTools.htmlEscape(value.get(attribute1),true);
				this.output.b += Std.string(input);
				this.output.b += "\"";
			}
			if(this.hasChildren(value)) {
				this.output.b += ">";
				if(this.pretty) {
					this.output.b += "\n";
				}
				if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
				}
				let _g_current = 0;
				let _g_array = value.children;
				while(_g_current < _g_array.length) {
					let child = _g_array[_g_current++];
					this.writeNode(child,this.pretty ? tabs + "\t" : tabs);
				}
				this.output.b += Std.string(tabs + "</");
				if(value.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
				}
				this.output.b += Std.string(value.nodeName);
				this.output.b += ">";
				if(this.pretty) {
					this.output.b += "\n";
				}
			} else {
				this.output.b += "/>";
				if(this.pretty) {
					this.output.b += "\n";
				}
			}
			break;
		case 1:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			let nodeValue = value.nodeValue;
			if(nodeValue.length != 0) {
				let input = tabs + StringTools.htmlEscape(nodeValue);
				this.output.b += Std.string(input);
				if(this.pretty) {
					this.output.b += "\n";
				}
			}
			break;
		case 2:
			this.output.b += Std.string(tabs + "<![CDATA[");
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string(value.nodeValue);
			this.output.b += "]]>";
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 3:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			let commentContent = value.nodeValue;
			let _this_r = new RegExp("[\n\r\t]+","g".split("u").join(""));
			commentContent = commentContent.replace(_this_r,"");
			commentContent = "<!--" + commentContent + "-->";
			this.output.b += tabs == null ? "null" : "" + tabs;
			let input = StringTools.trim(commentContent);
			this.output.b += Std.string(input);
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 4:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string("<!DOCTYPE " + value.nodeValue + ">");
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 5:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string("<?" + value.nodeValue + "?>");
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 6:
			if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			let _g_current = 0;
			let _g_array = value.children;
			while(_g_current < _g_array.length) {
				let child = _g_array[_g_current++];
				this.writeNode(child,tabs);
			}
			break;
		}
	}
	hasChildren(value) {
		if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
		}
		let _g_current = 0;
		let _g_array = value.children;
		while(_g_current < _g_array.length) {
			let child = _g_array[_g_current++];
			switch(child.nodeType) {
			case 0:case 1:
				return true;
			case 2:case 3:
				if(child.nodeType == Xml.Document || child.nodeType == Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, unexpected " + (child.nodeType == null ? "null" : XmlType.toString(child.nodeType)));
				}
				if(StringTools.ltrim(child.nodeValue).length != 0) {
					return true;
				}
				break;
			default:
			}
		}
		return false;
	}
	static print(xml,pretty) {
		if(pretty == null) {
			pretty = false;
		}
		let printer = new haxe_xml_Printer(pretty);
		printer.writeNode(xml,"");
		return printer.output.b;
	}
}
haxe_xml_Printer.__name__ = true;
Object.assign(haxe_xml_Printer.prototype, {
	__class__: haxe_xml_Printer
});
var haxe_zip_ExtraField = $hxEnums["haxe.zip.ExtraField"] = { __ename__:true,__constructs__:null
	,FUnknown: ($_=function(tag,bytes) { return {_hx_index:0,tag:tag,bytes:bytes,__enum__:"haxe.zip.ExtraField",toString:$estr}; },$_._hx_name="FUnknown",$_.__params__ = ["tag","bytes"],$_)
	,FInfoZipUnicodePath: ($_=function(name,crc) { return {_hx_index:1,name:name,crc:crc,__enum__:"haxe.zip.ExtraField",toString:$estr}; },$_._hx_name="FInfoZipUnicodePath",$_.__params__ = ["name","crc"],$_)
	,FUtf8: {_hx_name:"FUtf8",_hx_index:2,__enum__:"haxe.zip.ExtraField",toString:$estr}
};
haxe_zip_ExtraField.__constructs__ = [haxe_zip_ExtraField.FUnknown,haxe_zip_ExtraField.FInfoZipUnicodePath,haxe_zip_ExtraField.FUtf8];
class haxe_zip_Writer {
	constructor(o) {
		this.o = o;
		this.files = new haxe_ds_List();
	}
	writeZipDate(date) {
		let hour = date.getHours();
		let min = date.getMinutes();
		let sec = date.getSeconds() >> 1;
		this.o.writeUInt16(hour << 11 | min << 5 | sec);
		let year = date.getFullYear() - 1980;
		let month = date.getMonth() + 1;
		let day = date.getDate();
		this.o.writeUInt16(year << 9 | month << 5 | day);
	}
	writeEntryHeader(f) {
		let o = this.o;
		let flags = 0;
		if(f.extraFields != null) {
			let _g_head = f.extraFields.h;
			while(_g_head != null) {
				let val = _g_head.item;
				_g_head = _g_head.next;
				let e = val;
				if(e._hx_index == 2) {
					flags |= 2048;
				}
			}
		}
		o.writeInt32(67324752);
		o.writeUInt16(20);
		o.writeUInt16(flags);
		if(f.data == null) {
			f.fileSize = 0;
			f.dataSize = 0;
			f.crc32 = 0;
			f.compressed = false;
			f.data = new haxe_io_Bytes(new ArrayBuffer(0));
		} else {
			if(f.crc32 == null) {
				if(f.compressed) {
					throw haxe_Exception.thrown("CRC32 must be processed before compression");
				}
				f.crc32 = haxe_crypto_Crc32.make(f.data);
			}
			if(!f.compressed) {
				f.fileSize = f.data.length;
			}
			f.dataSize = f.data.length;
		}
		o.writeUInt16(f.compressed ? 8 : 0);
		this.writeZipDate(f.fileTime);
		o.writeInt32(f.crc32);
		o.writeInt32(f.dataSize);
		o.writeInt32(f.fileSize);
		o.writeUInt16(f.fileName.length);
		let e = new haxe_io_BytesOutput();
		if(f.extraFields != null) {
			let _g_head = f.extraFields.h;
			while(_g_head != null) {
				let val = _g_head.item;
				_g_head = _g_head.next;
				let f = val;
				switch(f._hx_index) {
				case 0:
					let tag = f.tag;
					let bytes = f.bytes;
					e.writeUInt16(tag);
					e.writeUInt16(bytes.length);
					e.write(bytes);
					break;
				case 1:
					let name = f.name;
					let crc = f.crc;
					let namebytes = haxe_io_Bytes.ofString(name);
					e.writeUInt16(28789);
					e.writeUInt16(namebytes.length + 5);
					e.writeByte(1);
					e.writeInt32(crc);
					e.write(namebytes);
					break;
				case 2:
					break;
				}
			}
		}
		let ebytes = e.getBytes();
		o.writeUInt16(ebytes.length);
		o.writeString(f.fileName);
		o.write(ebytes);
		this.files.add({ name : f.fileName, compressed : f.compressed, clen : f.data.length, size : f.fileSize, crc : f.crc32, date : f.fileTime, fields : ebytes});
	}
	write(files) {
		let _g_head = files.h;
		while(_g_head != null) {
			let val = _g_head.item;
			_g_head = _g_head.next;
			let f = val;
			this.writeEntryHeader(f);
			this.o.writeFullBytes(f.data,0,f.data.length);
		}
		this.writeCDR();
	}
	writeCDR() {
		let cdr_size = 0;
		let cdr_offset = 0;
		let _g_head = this.files.h;
		while(_g_head != null) {
			let val = _g_head.item;
			_g_head = _g_head.next;
			let f = val;
			let namelen = f.name.length;
			let extraFieldsLength = f.fields.length;
			this.o.writeInt32(33639248);
			this.o.writeUInt16(20);
			this.o.writeUInt16(20);
			this.o.writeUInt16(0);
			this.o.writeUInt16(f.compressed ? 8 : 0);
			this.writeZipDate(f.date);
			this.o.writeInt32(f.crc);
			this.o.writeInt32(f.clen);
			this.o.writeInt32(f.size);
			this.o.writeUInt16(namelen);
			this.o.writeUInt16(extraFieldsLength);
			this.o.writeUInt16(0);
			this.o.writeUInt16(0);
			this.o.writeUInt16(0);
			this.o.writeInt32(0);
			this.o.writeInt32(cdr_offset);
			this.o.writeString(f.name);
			this.o.write(f.fields);
			cdr_size += 46 + namelen + extraFieldsLength;
			cdr_offset += 30 + namelen + extraFieldsLength + f.clen;
		}
		this.o.writeInt32(101010256);
		this.o.writeUInt16(0);
		this.o.writeUInt16(0);
		this.o.writeUInt16(this.files.length);
		this.o.writeUInt16(this.files.length);
		this.o.writeInt32(cdr_size);
		this.o.writeInt32(cdr_offset);
		this.o.writeUInt16(0);
	}
}
haxe_zip_Writer.__name__ = true;
Object.assign(haxe_zip_Writer.prototype, {
	__class__: haxe_zip_Writer
});
class js_Boot {
	static getClass(o) {
		if(o == null) {
			return null;
		} else if(((o) instanceof Array)) {
			return Array;
		} else {
			let cl = o.__class__;
			if(cl != null) {
				return cl;
			}
			let name = js_Boot.__nativeClassName(o);
			if(name != null) {
				return js_Boot.__resolveNativeClass(name);
			}
			return null;
		}
	}
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(o.__enum__) {
				let e = $hxEnums[o.__enum__];
				let con = e.__constructs__[o._hx_index];
				let n = con._hx_name;
				if(con.__params__) {
					s = s + "\t";
					return n + "(" + ((function($this) {
						var $r;
						let _g = [];
						{
							let _g1 = 0;
							let _g2 = con.__params__;
							while(true) {
								if(!(_g1 < _g2.length)) {
									break;
								}
								let p = _g2[_g1];
								_g1 = _g1 + 1;
								_g.push(js_Boot.__string_rec(o[p],s));
							}
						}
						$r = _g;
						return $r;
					}(this))).join(",") + ")";
				} else {
					return n;
				}
			}
			if(((o) instanceof Array)) {
				let str = "[";
				s += "\t";
				let _g = 0;
				let _g1 = o.length;
				while(_g < _g1) {
					let i = _g++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr;
			try {
				tostr = o.toString;
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n";
			s += "\t";
			let hasp = o.hasOwnProperty != null;
			let k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
	static __interfLoop(cc,cl) {
		if(cc == null) {
			return false;
		}
		if(cc == cl) {
			return true;
		}
		let intf = cc.__interfaces__;
		if(intf != null && (cc.__super__ == null || cc.__super__.__interfaces__ != intf)) {
			let _g = 0;
			let _g1 = intf.length;
			while(_g < _g1) {
				let i = _g++;
				let i1 = intf[i];
				if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
					return true;
				}
			}
		}
		return js_Boot.__interfLoop(cc.__super__,cl);
	}
	static __instanceof(o,cl) {
		if(cl == null) {
			return false;
		}
		switch(cl) {
		case Array:
			return ((o) instanceof Array);
		case Bool:
			return typeof(o) == "boolean";
		case Dynamic:
			return o != null;
		case Float:
			return typeof(o) == "number";
		case Int:
			if(typeof(o) == "number") {
				return ((o | 0) === o);
			} else {
				return false;
			}
			break;
		case String:
			return typeof(o) == "string";
		default:
			if(o != null) {
				if(typeof(cl) == "function") {
					if(js_Boot.__downcastCheck(o,cl)) {
						return true;
					}
				} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
					if(((o) instanceof cl)) {
						return true;
					}
				}
			} else {
				return false;
			}
			if(cl == Class ? o.__name__ != null : false) {
				return true;
			}
			if(cl == Enum ? o.__ename__ != null : false) {
				return true;
			}
			return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
		}
	}
	static __downcastCheck(o,cl) {
		if(!((o) instanceof cl)) {
			if(cl.__isInterface__) {
				return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	static __cast(o,t) {
		if(o == null || js_Boot.__instanceof(o,t)) {
			return o;
		} else {
			throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
		}
	}
	static __nativeClassName(o) {
		let name = js_Boot.__toStr.call(o).slice(8,-1);
		if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
			return null;
		}
		return name;
	}
	static __isNativeObj(o) {
		return js_Boot.__nativeClassName(o) != null;
	}
	static __resolveNativeClass(name) {
		return $global[name];
	}
}
js_Boot.__name__ = true;
class model_Obj {
	constructor(name) {
		this.set_name(name);
		this.fields = [];
	}
	set_name(name) {
		this.name = name;
		this.dbName = model_Obj.fixName(name);
		this.className = this.dbName.charAt(0).toUpperCase() + HxOverrides.substr(this.dbName,1,null);
		return this.name;
	}
	getField(fName) {
		return Lambda.find(this.fields,function(f) {
			return f.name == fName;
		});
	}
	getFieldIndex(fName) {
		return Lambda.findIndex(this.fields,function(f) {
			return f.name == fName;
		});
	}
	static fixName(iStr,camelCase) {
		if(camelCase == null) {
			camelCase = true;
		}
		let oStr = "";
		let toUpperCase = false;
		let _g = 0;
		let _g1 = UnicodeString.get_length(iStr);
		while(_g < _g1) {
			let i = _g++;
			let c = UnicodeString.charAt(iStr,i);
			let oStr1;
			switch(c) {
			case " ":
				if(camelCase) {
					toUpperCase = true;
					oStr1 = "";
				} else {
					oStr1 = "_";
				}
				break;
			case ".":
				oStr1 = "";
				break;
			case "À":case "Â":case "Ä":
				oStr1 = "A";
				break;
			case "Æ":
				oStr1 = "EA";
				break;
			case "Ç":
				oStr1 = "C";
				break;
			case "È":case "É":case "Ê":case "Ë":
				oStr1 = "E";
				break;
			case "Î":case "Ï":
				oStr1 = "I";
				break;
			case "Ô":case "Ö":
				oStr1 = "O";
				break;
			case "Ù":case "Û":case "Ü":
				oStr1 = "U";
				break;
			case "à":case "â":case "ä":
				oStr1 = "a";
				break;
			case "æ":
				oStr1 = "ea";
				break;
			case "ç":
				oStr1 = "c";
				break;
			case "è":case "é":case "ê":case "ë":
				oStr1 = "e";
				break;
			case "î":case "ï":
				oStr1 = "i";
				break;
			case "ô":case "ö":
				oStr1 = "o";
				break;
			case "ù":case "û":case "ü":
				oStr1 = "u";
				break;
			case "Œ":
				oStr1 = "EO";
				break;
			case "œ":
				oStr1 = "eo";
				break;
			default:
				if(toUpperCase) {
					toUpperCase = false;
					oStr1 = c.toUpperCase();
				} else {
					oStr1 = c;
				}
			}
			oStr += oStr1;
		}
		return oStr;
	}
}
model_Obj.__name__ = true;
Object.assign(model_Obj.prototype, {
	__class__: model_Obj
});
class model_Set extends model_Obj {
	constructor(name,superset,isTypedef,isInterface,isAbstract) {
		if(isAbstract == null) {
			isAbstract = false;
		}
		if(isInterface == null) {
			isInterface = false;
		}
		if(isTypedef == null) {
			isTypedef = false;
		}
		super(name);
		this.superset = superset;
		this.subsets = [];
		this.subsetType = "";
		this.subsetOption = -1;
		this.subsetCode = "";
		this.id = [];
		this.compound = null;
		this.isTypedef = isTypedef;
		this.isInterface = isInterface;
		this.isAbstract = isAbstract;
		this.interfaces = [];
		this.constructors = [];
		this.methods = [];
		this.accessors = [];
		this.navFields = [];
	}
	getFieldCode(fName) {
		let field = Lambda.find(this.fields,function(f) {
			return f.className == fName;
		});
		if(field == null) {
			field = Lambda.find(this.navFields,function(f) {
				return f.className == fName;
			});
		}
		return field;
	}
	getFieldFromArrayType(tName) {
		let field = Lambda.find(this.fields,function(f) {
			return HxOverrides.substr(f.classType,6,f.classType.length - 7) == tName;
		});
		if(field == null) {
			field = Lambda.find(this.navFields,function(f) {
				return HxOverrides.substr(f.classType,6,f.classType.length - 7) == tName;
			});
		}
		return field;
	}
	isGeneric() {
		if(!Lambda.exists(this.fields,function(f) {
			if(!f.isStatic) {
				if(f.classType.indexOf("<T>") == -1) {
					return f.classType == "T";
				} else {
					return true;
				}
			} else {
				return false;
			}
		})) {
			return Lambda.exists(this.methods,function(m) {
				if(!m.isStatic) {
					return m.isGeneric();
				} else {
					return false;
				}
			});
		} else {
			return true;
		}
	}
	getPluralClassName() {
		let lastChar = this.className.charAt(this.className.length - 1).toLowerCase();
		let endStr = this.className.substring(this.className.length - 2,this.className.length).toLowerCase();
		let pluralName = this.className + "s";
		if(endStr == "au" || endStr == "eu") {
			pluralName = this.className + "x";
		} else if(endStr == "al") {
			pluralName = this.className.substring(0,this.className.length - 2) + "aux";
		} else if(lastChar == "z" || lastChar == "x" || lastChar == "s") {
			pluralName = this.className;
		}
		return pluralName;
	}
}
model_Set.__name__ = true;
model_Set.__super__ = model_Obj;
Object.assign(model_Set.prototype, {
	__class__: model_Set
});
class model_Association extends model_Set {
	constructor(name) {
		super(name);
		this.links = [];
		this.isAgregation = false;
	}
	isNN() {
		return !Lambda.exists(this.links,function(l) {
			return l.max == "1";
		});
	}
	isRelation() {
		if(!this.isClass()) {
			return this.isNN();
		} else {
			return true;
		}
	}
	isClass() {
		if(!(this.fields.length != 0 || this.isAgregation)) {
			return this.links.length > 2;
		} else {
			return true;
		}
	}
}
model_Association.__name__ = true;
model_Association.__super__ = model_Set;
Object.assign(model_Association.prototype, {
	__class__: model_Association
});
class model_Diagram {
	constructor() {
		this.sets = new haxe_ds_StringMap();
		this.associations = new haxe_ds_StringMap();
		this.height = 0;
		this.width = 0;
	}
	getObj(name) {
		let o = this.sets.h[name];
		if(o == null) {
			o = this.associations.h[name];
		}
		return o;
	}
	iterator() {
		return new model_ObjectsIterator(this);
	}
	getGrid() {
		let _g = [];
		let _g1 = 0;
		let _g2 = this.height;
		while(_g1 < _g2) {
			let row = _g1++;
			let _g2 = [];
			let _g3 = 0;
			let _g4 = this.width;
			while(_g3 < _g4) {
				let col = _g3++;
				_g2.push(null);
			}
			_g.push(_g2);
		}
		let grid = _g;
		let o = this.iterator();
		while(o.hasNext()) {
			let o1 = o.next();
			grid[o1.row][o1.col] = o1;
		}
		return grid;
	}
	loadGrid(grid) {
		this.height = grid.length;
		this.width = this.height == 0 ? 0 : grid[0].length;
		let _g = 0;
		let _g1 = grid.length;
		while(_g < _g1) {
			let row = _g++;
			let _g1 = 0;
			let _g2 = grid[row].length;
			while(_g1 < _g2) {
				let col = _g1++;
				if(grid[row][col] != null) {
					grid[row][col].row = row;
					grid[row][col].col = col;
				}
			}
		}
	}
}
model_Diagram.__name__ = true;
Object.assign(model_Diagram.prototype, {
	__class__: model_Diagram
});
class model_ObjectsIterator {
	constructor(diagram) {
		let sets = Lambda.array(diagram.sets);
		let associations = Lambda.array(diagram.associations);
		this.objects = Lambda.concat(sets,associations);
		this.i = 0;
	}
	hasNext() {
		return this.i != this.objects.length;
	}
	next() {
		this.i++;
		return this.objects[this.i - 1];
	}
}
model_ObjectsIterator.__name__ = true;
Object.assign(model_ObjectsIterator.prototype, {
	__class__: model_ObjectsIterator
});
class model_Field {
	constructor(name,type,visibility,isStatic) {
		if(isStatic == null) {
			isStatic = false;
		}
		if(visibility == null) {
			visibility = 0;
		}
		this.set_name(name);
		this.set_type(type);
		this.visibility = visibility;
		this.isStatic = isStatic;
	}
	set_name(name) {
		this.name = name;
		this.className = model_Obj.fixName(name);
		return this.name;
	}
	set_type(type) {
		this.type = type;
		this.dbType = type.toUpperCase() == "COUNTER" ? "INT" : type.toUpperCase();
		this.classType = model_Field.classOf(type);
		this.languageType = this.classType;
		return this.type;
	}
	isArray() {
		return this.classType.substring(0,5) == "Array";
	}
	toDomainString() {
		return model_Field.getVisibilitySymbol(this.visibility) + " " + this.className;
	}
	toUMLString() {
		let str = model_Field.getVisibilitySymbol(this.visibility) + " " + this.className;
		if(this.classType != "") {
			str += " : " + this.classType;
		}
		return str;
	}
	static getVisibilitySymbol(value) {
		switch(value) {
		case model_Field.ACCESS_PRIVATE:
			return "-";
		case model_Field.ACCESS_PROTECTED:
			return "#";
		case model_Field.ACCESS_PUBLIC:
			return "+";
		default:
			return " ";
		}
	}
	static classOf(typeName) {
		let upperName = typeName.toUpperCase();
		if(upperName == "FLOAT") {
			return "Float";
		} else if(upperName == "DOUBLE") {
			return "Double";
		} else if(upperName == "BOOLEAN") {
			return "Bool";
		} else if(upperName == "DATE") {
			return "Date";
		} else if(upperName == "TIME") {
			return "Time";
		} else if(upperName == "DATETIME") {
			return "DateTime";
		} else if(upperName == "INTEGER" || upperName == "INT" || upperName == "COUNTER") {
			return "Int";
		} else if(upperName.indexOf("CHAR(") == 0 || upperName.indexOf("VARCHAR(") == 0 || upperName == "TEXT") {
			return "String";
		} else {
			return typeName;
		}
	}
	static arrayOf(typeName) {
		return "Array<" + model_Field.classOf(typeName) + ">";
	}
}
model_Field.__name__ = true;
Object.assign(model_Field.prototype, {
	__class__: model_Field
});
class model_Link {
	constructor(set,role,min,max,isWeak,isAgregate,hasArrow,visibility) {
		this.set = set;
		this.set_role(role);
		this.min = min;
		this.max = max;
		this.isWeak = isWeak;
		this.isAgregate = isAgregate;
		this.hasArrow = hasArrow;
		this.visibility = visibility;
	}
	set_role(role) {
		this.role = role;
		this.classRole = model_Obj.fixName(role);
		return this.role;
	}
	getMCDCards() {
		if(this.min == "X" && this.max == "X") {
			return "";
		} else {
			return this.min + "," + this.max;
		}
	}
	getUMLCards() {
		let cards = "";
		if(this.min != "X" || this.max != "X") {
			if(this.min == this.max) {
				cards = this.min;
			} else if(this.min == "0" && this.max == "N") {
				cards = "*";
			} else {
				cards = this.min + ".." + StringTools.replace(this.max,"N","*");
			}
		}
		return cards;
	}
}
model_Link.__name__ = true;
Object.assign(model_Link.prototype, {
	__class__: model_Link
});
class model_MLD {
	constructor() {
		this.relations = new haxe_ds_StringMap();
	}
	toString(univ) {
		if(univ == null) {
			univ = true;
		}
		let _g = [];
		let x = $getIterator(this.relations);
		while(x.hasNext()) {
			let x1 = x.next();
			_g.push(univ ? x1.toUnivString() : x1.toENString());
		}
		return _g.join("\n");
	}
}
model_MLD.__name__ = true;
Object.assign(model_MLD.prototype, {
	__class__: model_MLD
});
class model_Method extends model_Field {
	constructor(name,type,visibility,isStatic) {
		if(isStatic == null) {
			isStatic = false;
		}
		if(visibility == null) {
			visibility = 0;
		}
		super(name,type,visibility,isStatic);
		this.params = [];
	}
	toUMLString() {
		let str = model_Field.getVisibilitySymbol(this.visibility) + " " + this.className + "(";
		let _g = [];
		let x = $getIterator(this.params);
		while(x.hasNext()) {
			let x1 = x.next();
			_g.push(x1.className + ":" + x1.classType);
		}
		str += _g.join(", ");
		str += ")";
		if(this.classType != "") {
			str += " : " + this.classType;
		}
		return str;
	}
	isGeneric() {
		if(!(this.classType.indexOf("<T>") != -1 || this.classType == "T")) {
			return Lambda.exists(this.params,function(p) {
				if(p.classType.indexOf("<T>") == -1) {
					return p.classType == "T";
				} else {
					return true;
				}
			});
		} else {
			return true;
		}
	}
}
model_Method.__name__ = true;
model_Method.__super__ = model_Field;
Object.assign(model_Method.prototype, {
	__class__: model_Method
});
class model_Relation extends model_Obj {
	constructor(name) {
		super(name);
		this.key = [];
		this.foreignKeys = [];
	}
	mergeForeignKeys() {
		let mergedFKList = [];
		let i = 0;
		while(i < this.foreignKeys.length) {
			let currentFK = { names : [this.foreignKeys[i].name], relation : this.foreignKeys[i].relation, keys : [this.foreignKeys[i].key]};
			let _g = 1;
			let _g1 = currentFK.relation.key.length;
			while(_g < _g1) {
				let j = _g++;
				currentFK.names.push(this.foreignKeys[i + j].name);
				currentFK.keys.push(this.foreignKeys[i + j].key);
				++i;
			}
			++i;
			mergedFKList.push(currentFK);
		}
		return mergedFKList;
	}
	toENString() {
		let tmp = this.name + " (";
		let _this = this.fields;
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = _this[i].name;
		}
		let tmp1 = tmp + result.join(", ") + ")\n" + "    clé primaire : " + this.key.join(", ") + (this.foreignKeys.length == 0 ? "" : "\n");
		let _this1 = this.mergeForeignKeys();
		let result1 = new Array(_this1.length);
		let _g2 = 0;
		let _g3 = _this1.length;
		while(_g2 < _g3) {
			let i = _g2++;
			let mfk = _this1[i];
			result1[i] = "    clé étrangère : " + mfk.names.join(", ") + " référence " + mfk.relation.name + "(" + mfk.keys.join(", ") + ")";
		}
		return tmp1 + result1.join("\n") + "\n";
	}
	toUnivString() {
		let strings = [];
		let _g = 0;
		let _g1 = this.key;
		while(_g < _g1.length) {
			let k = _g1[_g];
			++_g;
			let _g2 = [];
			let x = $getIterator(this.foreignKeys);
			while(x.hasNext()) {
				let x1 = x.next();
				_g2.push(x1.name);
			}
			strings.push("\x1B[4m" + (_g2.indexOf(k) == -1 ? "" : "#") + k + "\x1B[0m");
		}
		let _g2 = 0;
		let _g3 = this.fields;
		while(_g2 < _g3.length) {
			let f = _g3[_g2];
			++_g2;
			if(this.key.indexOf(f.name) == -1) {
				let _g = [];
				let x = $getIterator(this.foreignKeys);
				while(x.hasNext()) {
					let x1 = x.next();
					_g.push(x1.name);
				}
				strings.push((_g.indexOf(f.name) == -1 ? "" : "#") + f.name);
			}
		}
		return "\x1B[1m" + this.name + "\x1B[0m (" + strings.join(", ") + ")\n";
	}
}
model_Relation.__name__ = true;
model_Relation.__super__ = model_Obj;
Object.assign(model_Relation.prototype, {
	__class__: model_Relation
});
class schema_Line {
	constructor(x1,y1,x2,y2,hOrientation,vOrientation) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.cx1 = x1;
		this.cy1 = y1;
		this.cx2 = x2;
		this.cy2 = y2;
		this.hOrientation = hOrientation;
		this.vOrientation = vOrientation;
	}
	getSteering() {
		return (this.y2 - this.y1) / (this.x2 - this.x1);
	}
	getOffset() {
		return this.y2 - this.getSteering() * this.x2;
	}
	isVertical() {
		return this.x1 == this.x2;
	}
	isHorizontal() {
		return this.y1 == this.y2;
	}
}
schema_Line.__name__ = true;
Object.assign(schema_Line.prototype, {
	__class__: schema_Line
});
class schema_MCDToSVG {
	static generateSVG(diagram) {
		let doc = Xml.createDocument();
		let svg = schema_Svg.initSvg(doc);
		let set = diagram.iterator();
		while(set.hasNext()) {
			let set1 = set.next();
			if(((set1) instanceof model_Association)) {
				set1.svg = schema_MCDToSVG.generateAssociationSVG(js_Boot.__cast(set1 , model_Association));
			} else {
				set1.svg = schema_MCDToSVG.generateSetSVG(set1);
			}
			svg.addChild(set1.svg);
		}
		schema_Svg.placeObjects(diagram,svg,diagram.height,diagram.width);
		schema_MCDToSVG.drawLines(diagram,svg);
		return doc;
	}
	static generateAssociationSVG(set) {
		let fieldsCount = 0;
		let chrWidth = set.name.length;
		let _g = 0;
		let _g1 = set.fields;
		while(_g < _g1.length) {
			let field = _g1[_g];
			++_g;
			++fieldsCount;
			if(field.name.length > chrWidth) {
				chrWidth = field.name.length;
			}
		}
		let g = Xml.createElement("g");
		if(set.isAgregation) {
			let rect = Xml.createElement("rect");
			g.addChild(rect);
			rect.set("height",Std.string((fieldsCount == 0 ? 2 : fieldsCount + 1) * 16 + 10));
			rect.set("width",Std.string(chrWidth * 9.5 + 10 + 10.));
			rect.set("style","fill:white");
		}
		let rect = Xml.createElement("rect");
		g.addChild(rect);
		rect.set("height",Std.string((fieldsCount == 0 ? 2 : fieldsCount + 1) * 16 + 10));
		rect.set("width",Std.string(chrWidth * 9.5 + 10 + 10.));
		rect.set("rx","20");
		rect.set("ry","20");
		rect.set("style","fill:lightgrey");
		let line = Xml.createElement("line");
		g.addChild(line);
		line.set("x1","0");
		line.set("x2",Std.string(chrWidth * 9.5 + 10 + 10.));
		line.set("y1","21");
		line.set("y2","21");
		let title = Xml.createElement("text");
		g.addChild(title);
		title.addChild(Xml.createPCData(set.name));
		title.set("x",Std.string(10. + (chrWidth - set.name.length) * 9.5 / 2));
		title.set("y","17");
		let text = Xml.createElement("text");
		g.addChild(text);
		let _g2 = 0;
		let _g3 = set.fields.length;
		while(_g2 < _g3) {
			let i = _g2++;
			let tspan = Xml.createElement("tspan");
			text.addChild(tspan);
			tspan.set("x",Std.string(10.));
			tspan.set("y",Std.string(16 * (i + 2) + 5));
			tspan.addChild(Xml.createPCData(set.fields[i].name));
		}
		return g;
	}
	static generateSetSVG(set) {
		let fieldsCount = 0;
		let chrWidth = set.name.length;
		let _g = 0;
		let _g1 = set.fields;
		while(_g < _g1.length) {
			let field = _g1[_g];
			++_g;
			if(!field.isStatic) {
				++fieldsCount;
				if(field.name.length > chrWidth) {
					chrWidth = field.name.length;
				}
			}
		}
		let g = Xml.createElement("g");
		let rect = Xml.createElement("rect");
		g.addChild(rect);
		rect.set("height",Std.string((fieldsCount == 0 ? 2 : fieldsCount + 1) * 16 + 10));
		rect.set("width",Std.string(chrWidth * 9.5 + 10 | 0));
		rect.set("style","fill:white");
		let titleBG = Xml.createElement("rect");
		g.addChild(titleBG);
		titleBG.set("height","21");
		titleBG.set("width",Std.string(chrWidth * 9.5 + 10));
		titleBG.set("style","fill:lightgrey");
		let title = Xml.createElement("text");
		g.addChild(title);
		title.addChild(Xml.createPCData(set.name));
		title.set("x",Std.string(5 + (chrWidth - set.name.length) * 9.5 / 2));
		title.set("y","16");
		let text = Xml.createElement("text");
		g.addChild(text);
		let _g2 = 0;
		let _g3 = set.fields.length;
		while(_g2 < _g3) {
			let i = _g2++;
			if(!set.fields[i].isStatic) {
				let tspan = Xml.createElement("tspan");
				text.addChild(tspan);
				tspan.set("x",Std.string(2.5));
				tspan.set("y",Std.string(16 * (i + 2) + 5));
				if(set.id.indexOf(set.fields[i].name) != -1) {
					tspan.set("style","text-decoration:underline");
				}
				tspan.addChild(Xml.createPCData(set.fields[i].name));
			}
		}
		if(set.subsets.length != 0) {
			let set1 = set.subsetType;
			if(g.nodeType != Xml.Document && g.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (g.nodeType == null ? "null" : XmlType.toString(g.nodeType)));
			}
			let tmp = Std.parseInt(g.children[0].get("width"));
			if(g.nodeType != Xml.Document && g.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (g.nodeType == null ? "null" : XmlType.toString(g.nodeType)));
			}
			g.addChild(schema_MCDToSVG.generateInheritanceSVG(set1,tmp,Std.parseInt(g.children[0].get("height"))));
		}
		return g;
	}
	static generateInheritanceSVG(type,setWidth,setHeight) {
		let w = 39;
		let h = w / 2 | 0;
		let g = Xml.createElement("g");
		let line = Xml.createElement("line");
		g.addChild(line);
		line.set("x1",Std.string(w / 2 | 0));
		line.set("x2",Std.string(w / 2 | 0));
		line.set("y1","0");
		line.set("y2","5");
		let path = Xml.createElement("path");
		g.addChild(path);
		path.set("d","M " + w + " " + (h + 5) + " a1,1 0 1,0 -" + w + " 0 l " + w + " 0");
		path.set("style","fill:lightgrey");
		let title = Xml.createElement("text");
		g.addChild(title);
		title.addChild(Xml.createPCData(type));
		title.set("x",Std.string(10. + (2 - type.length) * 9.5 / 2));
		title.set("y","22");
		g.set("transform","translate(" + Std.string((setWidth - w) / 2 | 0) + "," + (setHeight == null ? "null" : "" + setHeight) + ")");
		return g;
	}
	static drawLines(diagram,svg) {
		let h = diagram.associations.h;
		let assoc_h = h;
		let assoc_keys = Object.keys(h);
		let assoc_length = assoc_keys.length;
		let assoc_current = 0;
		while(assoc_current < assoc_length) {
			let assoc = assoc_h[assoc_keys[assoc_current++]];
			let i = 0;
			if(assoc.links.length == 2 && assoc.links[0].set.name == assoc.links[1].set.name) {
				svg.addChild(schema_MCDToSVG.generateLineCardsSVG(assoc,assoc.links[0].set,false,assoc.links[0].hasArrow,assoc.links[0].getMCDCards(),1,false));
				svg.addChild(schema_MCDToSVG.generateLineCardsSVG(assoc,assoc.links[0].set,false,assoc.links[1].hasArrow,assoc.links[1].getMCDCards(),-1,false));
				i = 2;
			}
			let _g = i;
			let _g1 = assoc.links.length;
			while(_g < _g1) {
				let j = _g++;
				svg.addChild(schema_MCDToSVG.generateLineCardsSVG(assoc,assoc.links[j].set,assoc.links[j].isWeak,assoc.links[j].hasArrow,assoc.links[j].getMCDCards(),null,false));
			}
		}
		let h1 = diagram.sets.h;
		let p_h = h1;
		let p_keys = Object.keys(h1);
		let p_length = p_keys.length;
		let p_current = 0;
		while(p_current < p_length) {
			let p = p_h[p_keys[p_current++]];
			if(p.subsets.length != 0) {
				let _g = 0;
				let _g1 = p.subsets;
				while(_g < _g1.length) {
					let c = _g1[_g];
					++_g;
					svg.addChild(schema_MCDToSVG.generateLineCardsSVG(p,c,false,false,"",null,true));
				}
			}
		}
	}
	static generateLineCardsSVG(set1,set2,isWeak,hasArrow,cards,bend,inheritance) {
		if(bend == null) {
			bend = 0;
		}
		if(isWeak) {
			cards = "(" + cards + ")";
		}
		let line = schema_Svg.getLine(set1,set2,"",cards,bend);
		if(inheritance) {
			let _this = schema_Svg.coordRE;
			let x1 = Std.parseInt(set1.svg.get("transform").replace(_this.r,"$1").split(",")[0]);
			let _this1 = schema_Svg.coordRE;
			let y1 = Std.parseInt(set1.svg.get("transform").replace(_this1.r,"$1").split(",")[1]);
			let _this2 = set1.svg;
			if(_this2.nodeType != Xml.Document && _this2.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this2.nodeType == null ? "null" : XmlType.toString(_this2.nodeType)));
			}
			let w1 = Std.parseInt(_this2.children[0].get("width"));
			let _this3 = set1.svg;
			if(_this3.nodeType != Xml.Document && _this3.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this3.nodeType == null ? "null" : XmlType.toString(_this3.nodeType)));
			}
			let h1 = Std.parseInt(_this3.children[0].get("height"));
			line.x1 = x1 + (w1 / 2 | 0);
			line.y1 = y1 + h1 + 19 + 5;
		}
		let g = Xml.createElement("g");
		g.addChild(schema_Svg.getSvgLine(line,bend,hasArrow ? schema_Svg.MARKERS[0].id : null));
		let mm = Xml.createElement("text");
		mm.addChild(Xml.createPCData(cards));
		mm.set("x",line.cx2 == null ? "null" : "" + line.cx2);
		mm.set("y",line.cy2 == null ? "null" : "" + line.cy2);
		g.addChild(mm);
		return g;
	}
}
$hx_exports["schema"]["MCDToSVG"] = schema_MCDToSVG;
schema_MCDToSVG.__name__ = true;
class schema_MLDToSVG {
	static generateSVG(mld,typed) {
		let doc = Xml.createDocument();
		let svg = schema_Svg.initSvg(doc);
		let h = mld.relations.h;
		let relation_h = h;
		let relation_keys = Object.keys(h);
		let relation_length = relation_keys.length;
		let relation_current = 0;
		while(relation_current < relation_length) {
			let relation = relation_h[relation_keys[relation_current++]];
			relation.svg = schema_MLDToSVG.generateTableSvg(relation,typed);
			svg.addChild(relation.svg);
		}
		schema_Svg.placeObjects(mld.relations,svg,mld.height,mld.width);
		let h1 = mld.relations.h;
		let relation_h1 = h1;
		let relation_keys1 = Object.keys(h1);
		let relation_length1 = relation_keys1.length;
		let relation_current1 = 0;
		while(relation_current1 < relation_length1) {
			let relation = relation_h1[relation_keys1[relation_current1++]];
			let _g = 0;
			let _g1 = relation.foreignKeys;
			while(_g < _g1.length) {
				let fk = _g1[_g];
				++_g;
				svg.addChild(schema_MLDToSVG.generateLineSVG(relation,fk));
			}
		}
		return doc;
	}
	static generateTableSvg(relation,typed) {
		let chrWidth = relation.name.length;
		let _g = 0;
		let _g1 = relation.fields;
		while(_g < _g1.length) {
			let field = _g1[_g];
			++_g;
			let lineWidth = field.name.length + (typed ? field.dbType.length + 2 : 0);
			if(lineWidth > chrWidth) {
				chrWidth = lineWidth;
			}
		}
		let g = Xml.createElement("g");
		let rect = Xml.createElement("rect");
		g.addChild(rect);
		rect.set("height",Std.string((relation.fields.length + 1) * 16 + 10));
		rect.set("width",Std.string(chrWidth * 9.5 + 10 | 0));
		rect.set("style","fill:white");
		let titleBG = Xml.createElement("rect");
		g.addChild(titleBG);
		titleBG.set("height","21");
		titleBG.set("width",Std.string(chrWidth * 9.5 + 10));
		titleBG.set("style","fill:lightgrey");
		let title = Xml.createElement("text");
		g.addChild(title);
		title.addChild(Xml.createPCData(relation.name));
		title.set("x",Std.string(5 + (chrWidth - relation.name.length) * 9.5 / 2));
		title.set("y","16");
		let text = Xml.createElement("text");
		g.addChild(text);
		let _g2 = 0;
		let _g3 = relation.fields.length;
		while(_g2 < _g3) {
			let i = _g2++;
			let tspan = Xml.createElement("tspan");
			text.addChild(tspan);
			tspan.set("x",Std.string(2.5));
			tspan.set("y",Std.string(16 * (i + 2) + 5));
			if(relation.key.indexOf(relation.fields[i].name) != -1) {
				tspan.set("style","text-decoration:underline");
			}
			tspan.addChild(Xml.createPCData(relation.fields[i].name));
			if(typed) {
				tspan = Xml.createElement("tspan");
				text.addChild(tspan);
				tspan.set("x",Std.string(5 + (chrWidth - relation.fields[i].dbType.length) * 9.5));
				tspan.set("y",Std.string(16 * (i + 2) + 5));
				tspan.addChild(Xml.createPCData(relation.fields[i].dbType));
			}
		}
		return g;
	}
	static generateLineSVG(relation,fk) {
		let _this = schema_Svg.coordRE;
		let coords1 = relation.svg.get("transform").replace(_this.r,"$1").split(",");
		let x1 = Std.parseInt(coords1[0]);
		let y1 = Std.parseInt(coords1[1]);
		let _this1 = relation.svg;
		if(_this1.nodeType != Xml.Document && _this1.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this1.nodeType == null ? "null" : XmlType.toString(_this1.nodeType)));
		}
		let w1 = Std.parseInt(_this1.children[0].get("width"));
		let _this2 = schema_Svg.coordRE;
		let coords2 = fk.relation.svg.get("transform").replace(_this2.r,"$1").split(",");
		let x2 = Std.parseInt(coords2[0]);
		let y2 = Std.parseInt(coords2[1]);
		let _this3 = fk.relation.svg;
		if(_this3.nodeType != Xml.Document && _this3.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this3.nodeType == null ? "null" : XmlType.toString(_this3.nodeType)));
		}
		let w2 = Std.parseInt(_this3.children[0].get("width"));
		y1 += 16 * (relation.getFieldIndex(fk.name) + 2);
		y2 += 16 * (fk.relation.getFieldIndex(fk.key) + 2);
		let xl1;
		let xl2;
		let xa = 5;
		if(relation.col == fk.relation.col) {
			x1 += w1;
			x2 += w2;
			xl1 = (Math.max(x1,x2) | 0) + 10;
			xl2 = xl1;
		} else if(relation.col < fk.relation.col) {
			x1 += w1;
			xl1 = x1 + 10;
			xl2 = x2 - 10;
			xa = -xa;
		} else {
			x2 += w2;
			xl1 = x1 - 10;
			xl2 = x2 + 10;
		}
		let g = Xml.createElement("g");
		let line = Xml.createElement("path");
		line.set("d","M " + x1 + " " + y1 + " L " + xl1 + " " + y1 + " L " + xl2 + " " + y2 + " L " + x2 + " " + y2);
		line.set("marker-end","url(#" + schema_Svg.MARKERS[0].id + ")");
		g.addChild(line);
		return g;
	}
}
$hx_exports["schema"]["MLDToSVG"] = schema_MLDToSVG;
schema_MLDToSVG.__name__ = true;
class schema_Svg {
	static initSvg(doc) {
		let svg = Xml.createElement("svg");
		doc.addChild(svg);
		svg.set("xmlns","http://www.w3.org/2000/svg");
		let defs = Xml.createElement("defs");
		svg.addChild(defs);
		let fontStyle = Xml.createElement("style");
		defs.addChild(fontStyle);
		fontStyle.addChild(Xml.createPCData("@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap')"));
		let css = Xml.createElement("style");
		defs.addChild(css);
		css.addChild(Xml.createPCData("text,text>tspan{" + "font-family:'Roboto Mono';font-size:16px" + "} rect{" + "stroke:black" + "} line,path{" + "fill:none;stroke:black" + "}"));
		let _g = 0;
		let _g1 = schema_Svg.MARKERS;
		while(_g < _g1.length) {
			let desc = _g1[_g];
			++_g;
			let marker = Xml.createElement("marker");
			marker.set("id",desc.id);
			marker.set("orient","auto");
			marker.set("refX","" + (desc.width + 1));
			marker.set("refY","" + desc.height / 2);
			marker.set("markerHeight","" + desc.height);
			marker.set("markerWidth","" + desc.width);
			let path = Xml.createElement("path");
			path.set("style",desc.style);
			path.set("d",desc.path);
			marker.addChild(path);
			defs.addChild(marker);
		}
		return svg;
	}
	static placeObjects(objects,svg,height,width,marginFactor) {
		if(marginFactor == null) {
			marginFactor = 1;
		}
		let _g = [];
		let _g1 = 0;
		let _g2 = height;
		while(_g1 < _g2) {
			let i = _g1++;
			_g.push(0);
		}
		let heights = _g;
		let _g3 = [];
		let _g4 = 0;
		let _g5 = width;
		while(_g4 < _g5) {
			let i = _g4++;
			_g3.push(0);
		}
		let widths = _g3;
		let o = $getIterator(objects);
		while(o.hasNext()) {
			let o1 = o.next();
			if(o1.svg != null) {
				let _this = o1.svg;
				if(_this.nodeType != Xml.Document && _this.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this.nodeType == null ? "null" : XmlType.toString(_this.nodeType)));
				}
				let w = Std.parseInt(_this.children[0].get("width"));
				let _this1 = o1.svg;
				if(_this1.nodeType != Xml.Document && _this1.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this1.nodeType == null ? "null" : XmlType.toString(_this1.nodeType)));
				}
				let h = Std.parseInt(_this1.children[0].get("height"));
				if(w > widths[o1.col]) {
					widths[o1.col] = w;
				}
				if(h > heights[o1.row]) {
					heights[o1.row] = h;
				}
			}
		}
		let th = 5;
		let lineOffsets = [];
		let _g6 = 0;
		let _g7 = height;
		while(_g6 < _g7) {
			let i = _g6++;
			lineOffsets[i] = th;
			th = th + heights[i] + (heights[i] != 0 ? 50 * marginFactor | 0 : 0);
		}
		let tw = 5;
		let columnOffsets = [];
		let _g8 = 0;
		let _g9 = width;
		while(_g8 < _g9) {
			let i = _g8++;
			columnOffsets[i] = tw;
			tw = tw + widths[i] + (widths[i] != 0 ? 50 * marginFactor | 0 : 0);
		}
		let o1 = $getIterator(objects);
		while(o1.hasNext()) {
			let o = o1.next();
			if(o.svg != null) {
				let columnOffsets1 = columnOffsets[o.col];
				let widths1 = widths[o.col];
				let _this = o.svg;
				if(_this.nodeType != Xml.Document && _this.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this.nodeType == null ? "null" : XmlType.toString(_this.nodeType)));
				}
				let w = columnOffsets1 + (widths1 - Std.parseInt(_this.children[0].get("width"))) / 2 | 0;
				let lineOffsets1 = lineOffsets[o.row];
				let heights1 = heights[o.row];
				let _this1 = o.svg;
				if(_this1.nodeType != Xml.Document && _this1.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this1.nodeType == null ? "null" : XmlType.toString(_this1.nodeType)));
				}
				let h = lineOffsets1 + (heights1 - Std.parseInt(_this1.children[0].get("height"))) / 2 | 0;
				o.svg.set("transform","translate(" + w + "," + h + ")");
			}
		}
		svg.set("width",tw == null ? "null" : "" + tw);
		svg.set("height",th == null ? "null" : "" + th);
	}
	static getLine(obj1,obj2,card1,card2,bend) {
		if(bend == null) {
			bend = 0;
		}
		if(card2 == null) {
			card2 = "";
		}
		if(card1 == null) {
			card1 = "";
		}
		let _this = schema_Svg.coordRE;
		let coords1 = obj1.svg.get("transform").replace(_this.r,"$1").split(",");
		let x1 = Std.parseInt(coords1[0]);
		let y1 = Std.parseInt(coords1[1]);
		let _this1 = obj1.svg;
		if(_this1.nodeType != Xml.Document && _this1.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this1.nodeType == null ? "null" : XmlType.toString(_this1.nodeType)));
		}
		let w1 = Std.parseInt(_this1.children[0].get("width"));
		let _this2 = obj1.svg;
		if(_this2.nodeType != Xml.Document && _this2.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this2.nodeType == null ? "null" : XmlType.toString(_this2.nodeType)));
		}
		let h1 = Std.parseInt(_this2.children[0].get("height"));
		let _this3 = schema_Svg.coordRE;
		let coords2 = obj2.svg.get("transform").replace(_this3.r,"$1").split(",");
		let x2 = Std.parseInt(coords2[0]);
		let y2 = Std.parseInt(coords2[1]);
		let _this4 = obj2.svg;
		if(_this4.nodeType != Xml.Document && _this4.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this4.nodeType == null ? "null" : XmlType.toString(_this4.nodeType)));
		}
		let w2 = Std.parseInt(_this4.children[0].get("width"));
		let _this5 = obj2.svg;
		if(_this5.nodeType != Xml.Document && _this5.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this5.nodeType == null ? "null" : XmlType.toString(_this5.nodeType)));
		}
		let h2 = Std.parseInt(_this5.children[0].get("height"));
		let hOrientation = obj1.col == obj2.col ? 0 : obj1.col < obj2.col ? -1 : 1;
		let vOrientation = obj1.row == obj2.row ? 0 : obj1.row < obj2.row ? -1 : 1;
		let line = new schema_Line(x1 + (w1 / 2 | 0),y1 + (h1 / 2 | 0),x2 + (w2 / 2 | 0),y2 + (h2 / 2 | 0),hOrientation,vOrientation);
		let dx = 0;
		let dy = 0;
		x1 += x1 < x2 ? w1 : 0;
		y1 += y1 < y2 ? h1 : 0;
		x2 += x2 < x1 ? w2 : 0;
		y2 += y2 < y1 ? h2 : 0;
		if(line.isVertical()) {
			line.y1 = y1;
			line.y2 = y2;
			if(bend != 0) {
				line.x1 += w1 * bend / 3 | 0;
				line.x2 += w2 * bend / 3 | 0;
				dx = bend * 5;
			}
		} else if(line.isHorizontal()) {
			line.x2 = x2;
			if(bend == 0) {
				line.x1 = x1;
			} else {
				line.y1 = y1 + (bend == 1 ? h1 : 0);
				line.y2 += h2 * bend / 3 | 0;
				dy = bend * 5;
			}
		} else if(bend == 1) {
			line.x1 = x1;
			line.y2 = y2;
			line.x2 -= (line.x2 - x2) / 2 | 0;
		} else if(bend == -1) {
			line.y1 = y1;
			line.x2 = x2;
			line.y2 -= (line.y2 - y2) / 2 | 0;
		} else {
			let steering = line.getSteering();
			let offset = line.getOffset();
			let segStart = y1 < y2 ? y1 - h1 : y1;
			let tx1 = Math.round((y1 - offset) / steering);
			let ty1 = Math.round(x1 * steering + offset);
			if(ty1 >= segStart && ty1 <= segStart + h1) {
				line.x1 = x1;
				line.y1 = ty1;
			} else {
				line.x1 = tx1;
				line.y1 = y1;
			}
			segStart = y2 < y1 ? y2 - h2 : y2;
			let tx2 = Math.round((y2 - offset) / steering);
			let ty2 = Math.round(x2 * steering + offset);
			if(ty2 >= segStart && ty2 <= segStart + h2) {
				line.x2 = x2;
				line.y2 = ty2;
			} else {
				line.x2 = tx2;
				line.y2 = y2;
			}
		}
		line.cx1 = line.x1 + 5;
		line.cy1 = line.y1 + 16 + 5;
		line.cx2 = line.x2 + 5 + dx;
		line.cy2 = line.y2 + 16 + 5 + dy;
		if(line.hOrientation == 1) {
			line.cx1 = line.x1 - (9.5 * card1.length + 7.5 | 0);
		}
		if(line.hOrientation == -1 || dx > 0) {
			line.cx2 = line.x2 - (9.5 * card2.length + 7.5 | 0) + dx;
		}
		if(line.vOrientation == 1) {
			line.cy1 = line.y1 - 7;
		}
		if(line.vOrientation == -1 || dy > 0) {
			line.cy2 = line.y2 - 7 + dy;
		}
		return line;
	}
	static getSvgLine(coords,bend,endMarkerId) {
		if(bend == null) {
			bend = 0;
		}
		let line;
		if(bend == 0) {
			line = Xml.createElement("line");
			line.set("x1",coords.x1 == null ? "null" : "" + coords.x1);
			line.set("x2",coords.x2 == null ? "null" : "" + coords.x2);
			line.set("y1",coords.y1 == null ? "null" : "" + coords.y1);
			line.set("y2",coords.y2 == null ? "null" : "" + coords.y2);
		} else {
			line = Xml.createElement("path");
			let xlm = (coords.x2 + coords.x1) / 2 | 0;
			let ylm = (coords.y2 + coords.y1) / 2 | 0;
			let distance = Math.sqrt(Math.pow(coords.x2 - coords.x1,2) + Math.pow(coords.y2 - coords.y1,2)) / 3;
			let steering = -1 / coords.getSteering();
			let angle = Math.atan(steering);
			let xlq = xlm;
			let ylq = ylm;
			if(coords.hOrientation == 0) {
				xlq += (Math.cos(angle) * distance | 0) * bend;
				ylq += (Math.sin(angle) * distance | 0) * bend;
			} else if(coords.vOrientation == 0) {
				xlq += (Math.cos(angle) * distance | 0) * bend;
				ylq += (Math.sin(angle) * distance | 0) * coords.hOrientation;
			} else {
				xlq += (Math.cos(angle) * distance | 0) * bend * -coords.hOrientation;
				ylq += (Math.sin(angle) * distance | 0) * bend * -coords.hOrientation;
			}
			line.set("d","M " + coords.x1 + " " + coords.y1 + " Q " + xlq + " " + ylq + " " + coords.x2 + " " + coords.y2);
		}
		if(endMarkerId != null) {
			line.set("marker-end","url(#" + endMarkerId + ")");
		}
		return line;
	}
}
schema_Svg.__name__ = true;
class schema_UMLToSVG {
	static generateSVG(diagram,classDiagram,showPrivate) {
		let doc = Xml.createDocument();
		let svg = schema_Svg.initSvg(doc);
		let set = diagram.iterator();
		while(set.hasNext()) {
			let set1 = set.next();
			if(((set1) instanceof model_Association)) {
				let assoc = js_Boot.__cast(set1 , model_Association);
				if(assoc.isClass()) {
					set1.svg = schema_UMLToSVG.generateAssociationSVG(diagram,assoc,classDiagram,showPrivate);
					svg.addChild(set1.svg);
				} else {
					set1.svg = Xml.createElement("g");
					set1.svg.addChild(Xml.createElement("g"));
					let _this = set1.svg;
					if(_this.nodeType != Xml.Document && _this.nodeType != Xml.Element) {
						throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this.nodeType == null ? "null" : XmlType.toString(_this.nodeType)));
					}
					_this.children[0].set("height","0");
					let _this1 = set1.svg;
					if(_this1.nodeType != Xml.Document && _this1.nodeType != Xml.Element) {
						throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this1.nodeType == null ? "null" : XmlType.toString(_this1.nodeType)));
					}
					_this1.children[0].set("width","0");
				}
			} else {
				set1.svg = schema_UMLToSVG.generateSetSVG(set1,classDiagram,showPrivate);
				svg.addChild(set1.svg);
			}
		}
		schema_Svg.placeObjects(diagram,svg,diagram.height,diagram.width,classDiagram ? 2 : 4);
		schema_UMLToSVG.drawInheritance(diagram,svg);
		schema_UMLToSVG.placeClassAssociations(diagram,svg);
		let h = diagram.associations.h;
		let assoc_h = h;
		let assoc_keys = Object.keys(h);
		let assoc_length = assoc_keys.length;
		let assoc_current = 0;
		while(assoc_current < assoc_length) {
			let assoc = assoc_h[assoc_keys[assoc_current++]];
			if(!assoc.isClass()) {
				let _this = assoc.svg;
				if(_this.nodeType != Xml.Document && _this.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this.nodeType == null ? "null" : XmlType.toString(_this.nodeType)));
				}
				let w = Std.parseInt(_this.children[0].get("width"));
				let _this1 = assoc.svg;
				if(_this1.nodeType != Xml.Document && _this1.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this1.nodeType == null ? "null" : XmlType.toString(_this1.nodeType)));
				}
				let h = Std.parseInt(_this1.children[0].get("height"));
				let _this2 = schema_Svg.coordRE;
				let coords = assoc.svg.get("transform").replace(_this2.r,"$1").split(",");
				let x = Std.parseInt(coords[0]);
				let y = Std.parseInt(coords[1]);
				svg.addChild(schema_UMLToSVG.drawLinks(assoc,x,y,w,h,!classDiagram));
			}
		}
		return doc;
	}
	static useField(field,classDiagram,showPrivate) {
		if(!field.isStatic || classDiagram) {
			if(field.visibility != model_Field.ACCESS_PUBLIC) {
				return showPrivate;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	static getFieldMaxWidth(field,classDiagram,showPrivate,isKey,max) {
		let maxWidth = max;
		if(schema_UMLToSVG.useField(field,classDiagram,showPrivate)) {
			let width = classDiagram ? field.toUMLString().length : field.toDomainString().length + (isKey ? 7 : 0);
			if(width > maxWidth) {
				maxWidth = width;
			}
		}
		return maxWidth;
	}
	static getMethodMaxWidth(method,classDiagram,showPrivate,max) {
		let maxWidth = max;
		if(schema_UMLToSVG.useField(method,classDiagram,showPrivate)) {
			let width = method.toUMLString().length;
			if(width > maxWidth) {
				maxWidth = width;
			}
		}
		return maxWidth;
	}
	static getFieldsCount(set,classDiagram,showPrivate) {
		let fieldsCount = 1;
		fieldsCount += Lambda.count(set.fields,function(field) {
			return schema_UMLToSVG.useField(field,classDiagram,showPrivate);
		});
		if(classDiagram) {
			fieldsCount += Lambda.count(set.navFields,function(field) {
				return schema_UMLToSVG.useField(field,classDiagram,showPrivate);
			});
			fieldsCount += Lambda.count(set.constructors,function(field) {
				return schema_UMLToSVG.useField(field,classDiagram,showPrivate);
			});
			fieldsCount += Lambda.count(set.accessors,function(field) {
				return schema_UMLToSVG.useField(field,classDiagram,showPrivate);
			});
			fieldsCount += Lambda.count(set.methods,function(field) {
				return schema_UMLToSVG.useField(field,classDiagram,showPrivate);
			});
		}
		return fieldsCount;
	}
	static getMaxWidth(set,classDiagram,showPrivate) {
		let chrWidth = set.className.length;
		Lambda.iter(set.fields,function(field) {
			chrWidth = schema_UMLToSVG.getFieldMaxWidth(field,classDiagram,showPrivate,set.id.includes(field.name),chrWidth);
		});
		Lambda.iter(set.navFields,function(field) {
			chrWidth = schema_UMLToSVG.getFieldMaxWidth(field,classDiagram,showPrivate,set.id.includes(field.name),chrWidth);
		});
		if(classDiagram) {
			Lambda.iter(set.constructors,function(method) {
				chrWidth = schema_UMLToSVG.getMethodMaxWidth(method,classDiagram,showPrivate,chrWidth);
			});
			Lambda.iter(set.accessors,function(method) {
				chrWidth = schema_UMLToSVG.getMethodMaxWidth(method,classDiagram,showPrivate,chrWidth);
			});
			Lambda.iter(set.methods,function(method) {
				chrWidth = schema_UMLToSVG.getMethodMaxWidth(method,classDiagram,showPrivate,chrWidth);
			});
		}
		return chrWidth;
	}
	static generateAssociationSVG(diagram,assoc,classDiagram,showPrivate) {
		return schema_UMLToSVG.generateSetSVG(assoc,classDiagram,showPrivate);
	}
	static generateSetSVG(set,classDiagram,showPrivate) {
		let fieldsCount = schema_UMLToSVG.getFieldsCount(set,classDiagram,showPrivate);
		let chrWidth = schema_UMLToSVG.getMaxWidth(set,classDiagram,showPrivate);
		let g = Xml.createElement("g");
		let rect = Xml.createElement("rect");
		g.addChild(rect);
		rect.set("height",Std.string(fieldsCount * 16 + 5 * (classDiagram ? 3 : 2)));
		rect.set("width",Std.string(chrWidth * 9.5 + 10));
		rect.set("style","fill:white");
		let titleBG = Xml.createElement("rect");
		g.addChild(titleBG);
		titleBG.set("height","21");
		titleBG.set("width",Std.string(chrWidth * 9.5 + 10));
		titleBG.set("style",classDiagram ? "fill:white" : "fill:lightgrey");
		let title = Xml.createElement("text");
		g.addChild(title);
		title.addChild(Xml.createPCData(set.className));
		title.set("x",Std.string(5 + (chrWidth - set.className.length) * 9.5 / 2));
		title.set("y","16");
		let text = Xml.createElement("text");
		g.addChild(text);
		let offset = 2;
		let fieldSets = [set.fields];
		if(classDiagram) {
			fieldSets.push(set.navFields);
		}
		let _g = 0;
		while(_g < fieldSets.length) {
			let fieldSet = fieldSets[_g];
			++_g;
			let _g1 = 0;
			while(_g1 < fieldSet.length) {
				let field = fieldSet[_g1];
				++_g1;
				if(schema_UMLToSVG.useField(field,classDiagram,showPrivate)) {
					let tspan = Xml.createElement("tspan");
					text.addChild(tspan);
					tspan.set("x",Std.string(2.5));
					tspan.set("y",Std.string(16 * offset + 5));
					if(field.isStatic) {
						tspan.set("style","text-decoration:underline");
					}
					let visibility;
					switch(field.visibility) {
					case model_Field.ACCESS_PRIVATE:
						visibility = "- ";
						break;
					case model_Field.ACCESS_PROTECTED:
						visibility = "# ";
						break;
					case model_Field.ACCESS_PUBLIC:
						visibility = "+ ";
						break;
					default:
						visibility = "  ";
					}
					tspan.addChild(Xml.createPCData(classDiagram ? field.toUMLString() : field.toDomainString() + (set.id.includes(field.name) ? " <<id>>" : "")));
					++offset;
				}
			}
		}
		let line = Xml.createElement("line");
		g.addChild(line);
		line.set("x1","0");
		line.set("x2",Std.string(10 + chrWidth * 9.5));
		line.set("y1",Std.string(16 * offset - 5));
		line.set("y2",Std.string(16 * offset - 5));
		if(classDiagram) {
			let methodSet = set.constructors;
			let _g = 0;
			while(_g < methodSet.length) {
				let method = methodSet[_g];
				++_g;
				if(schema_UMLToSVG.useField(method,classDiagram,showPrivate)) {
					let tspan = Xml.createElement("tspan");
					text.addChild(tspan);
					tspan.set("x",Std.string(2.5));
					tspan.set("y",Std.string(16 * offset + 10));
					if(method.isStatic) {
						tspan.set("style","text-decoration:underline");
					}
					tspan.addChild(Xml.createPCData(method.toUMLString()));
					++offset;
				}
			}
			let methodSet1 = set.accessors;
			let _g1 = 0;
			while(_g1 < methodSet1.length) {
				let method = methodSet1[_g1];
				++_g1;
				if(schema_UMLToSVG.useField(method,classDiagram,showPrivate)) {
					let tspan = Xml.createElement("tspan");
					text.addChild(tspan);
					tspan.set("x",Std.string(2.5));
					tspan.set("y",Std.string(16 * offset + 10));
					if(method.isStatic) {
						tspan.set("style","text-decoration:underline");
					}
					tspan.addChild(Xml.createPCData(method.toUMLString()));
					++offset;
				}
			}
			let methodSet2 = set.methods;
			let _g2 = 0;
			while(_g2 < methodSet2.length) {
				let method = methodSet2[_g2];
				++_g2;
				if(schema_UMLToSVG.useField(method,classDiagram,showPrivate)) {
					let tspan = Xml.createElement("tspan");
					text.addChild(tspan);
					tspan.set("x",Std.string(2.5));
					tspan.set("y",Std.string(16 * offset + 10));
					if(method.isStatic) {
						tspan.set("style","text-decoration:underline");
					}
					tspan.addChild(Xml.createPCData(method.toUMLString()));
					++offset;
				}
			}
		}
		return g;
	}
	static drawInheritance(diagram,svg) {
		let h = diagram.sets.h;
		let set_h = h;
		let set_keys = Object.keys(h);
		let set_length = set_keys.length;
		let set_current = 0;
		while(set_current < set_length) {
			let set = set_h[set_keys[set_current++]];
			if(set.superset != null) {
				svg.addChild(schema_Svg.getSvgLine(schema_Svg.getLine(set,set.superset),null,schema_Svg.MARKERS[1].id));
			}
		}
	}
	static placeClassAssociations(diagram,svg) {
		let h = diagram.associations.h;
		let assoc_h = h;
		let assoc_keys = Object.keys(h);
		let assoc_length = assoc_keys.length;
		let assoc_current = 0;
		while(assoc_current < assoc_length) {
			let assoc = assoc_h[assoc_keys[assoc_current++]];
			if(assoc.isClass()) {
				let _this = assoc.svg;
				if(_this.nodeType != Xml.Document && _this.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this.nodeType == null ? "null" : XmlType.toString(_this.nodeType)));
				}
				let w = Std.parseInt(_this.children[0].get("width"));
				let _this1 = assoc.svg;
				if(_this1.nodeType != Xml.Document && _this1.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this1.nodeType == null ? "null" : XmlType.toString(_this1.nodeType)));
				}
				let h = Std.parseInt(_this1.children[0].get("height"));
				let _this2 = schema_Svg.coordRE;
				let coords = assoc.svg.get("transform").replace(_this2.r,"$1").split(",");
				let x = Std.parseInt(coords[0]);
				let y = Std.parseInt(coords[1]);
				let g = schema_UMLToSVG.drawLinks(assoc,x,y,w,h,false);
				let cX = x + w / 2 | 0;
				let aCx = cX;
				let cY = y + h / 2 | 0;
				let aCy = cY;
				let aX = x;
				let aY = y;
				if(assoc.links.length == 2) {
					if(assoc.row == assoc.links[0].set.row && assoc.row == assoc.links[1].set.row) {
						aY += h / 2 + 20 | 0;
						aCy = aY;
					} else if(assoc.col == assoc.links[0].set.col && assoc.col == assoc.links[1].set.col) {
						aX += w / 2 + 20 | 0;
						aCx = aX;
					}
					let line = schema_Svg.getLine(assoc.links[0].set,assoc.links[1].set);
					cX = (line.x1 + line.x2) / 2 | 0;
					cY = (line.y1 + line.y2) / 2 | 0;
				} else {
					aX += w / 2 + 20 | 0;
					aY += h / 2 + 20 | 0;
				}
				if(assoc.col == diagram.width - 1) {
					svg.set("width",Std.string(Std.parseInt(svg.get("width")) + aX - x));
				}
				if(assoc.row == diagram.height - 1) {
					svg.set("height",Std.string(Std.parseInt(svg.get("height")) + aY - y));
				}
				assoc.svg.set("transform","translate(" + aX + "," + aY + ")");
				let dotted = Xml.createElement("line");
				dotted.set("x1",cX == null ? "null" : "" + cX);
				dotted.set("x2",aCx == null ? "null" : "" + aCx);
				dotted.set("y1",cY == null ? "null" : "" + cY);
				dotted.set("y2",aCy == null ? "null" : "" + aCy);
				dotted.set("stroke-dasharray","2,2");
				g.insertChild(dotted,0);
				svg.insertChild(g,0);
			}
		}
	}
	static drawLinks(assoc,x,y,w,h,showNav) {
		let g = Xml.createElement("g");
		if(assoc.links.length > 2) {
			x = x + w / 2 | 0;
			y = y + h / 2 | 0;
			let _g = 0;
			let _g1 = assoc.links;
			while(_g < _g1.length) {
				let link = _g1[_g];
				++_g;
				let line = schema_Svg.getLine(link.set,assoc);
				line.x2 = x;
				line.y2 = y;
				g.addChild(schema_Svg.getSvgLine(line));
			}
			let path = Xml.createElement("path");
			path.set("transform","translate(" + x + "," + y + ")");
			path.set("style","fill:white;stroke:black");
			path.set("d","M " + (-10) + " 0 L 0 " + (-10) + " L " + 10 + " 0 L 0 " + 10 + " Z");
			g.addChild(path);
		} else if(assoc.links.length == 2) {
			let link1 = assoc.links[0];
			let link2 = assoc.links[1];
			if(link2.isWeak || link2.isAgregate || link1.hasArrow) {
				link1 = assoc.links[1];
				link2 = assoc.links[0];
			}
			let markerId = link1.isWeak ? schema_Svg.MARKERS[3].id : link1.isAgregate ? schema_Svg.MARKERS[2].id : link2.hasArrow ? schema_Svg.MARKERS[0].id : null;
			let mm1 = Xml.createElement("text");
			mm1.addChild(Xml.createPCData(link2.getUMLCards()));
			let mm2 = Xml.createElement("text");
			mm2.addChild(Xml.createPCData(link1.isWeak || link1.isAgregate ? "" : link1.getUMLCards()));
			if(link1.set.className == link2.set.className) {
				let line1 = schema_Svg.getLine(assoc,link2.set,"",link1.isWeak || link1.isAgregate ? "" : link1.getUMLCards(),-1);
				let line2 = schema_Svg.getLine(assoc,link1.set,"",link2.getUMLCards(),1);
				let bezier = Xml.createElement("path");
				let xlq = line1.x1 + (line1.x2 == line2.x2 ? line1.x1 - line1.x2 : 0);
				let ylq = line1.y1 + (line1.y2 == line2.y2 ? line1.y1 - line1.y2 : 0);
				bezier.set("d","M " + line2.x2 + " " + line2.y2 + " Q " + xlq + " " + ylq + " " + line1.x2 + " " + line1.y2);
				if(markerId != null) {
					bezier.set("marker-end","url(#" + markerId + ")");
				}
				g.addChild(bezier);
				mm1.set("x",line2.cx2 == null ? "null" : "" + line2.cx2);
				mm1.set("y",line2.cy2 == null ? "null" : "" + line2.cy2);
				mm2.set("x",line1.cx2 == null ? "null" : "" + line1.cx2);
				mm2.set("y",line1.cy2 == null ? "null" : "" + line1.cy2);
				if(showNav) {
					schema_UMLToSVG.addNavLabel(link1,link2,line1,2,g);
					schema_UMLToSVG.addNavLabel(link2,link1,line2,2,g);
				}
			} else {
				let line = schema_Svg.getLine(link1.set,link2.set,link2.getUMLCards(),link1.isWeak || link1.isAgregate ? "" : link1.getUMLCards());
				g.addChild(schema_Svg.getSvgLine(line,0,markerId));
				mm1.set("x",line.cx1 == null ? "null" : "" + line.cx1);
				mm1.set("y",line.cy1 == null ? "null" : "" + line.cy1);
				mm2.set("x",line.cx2 == null ? "null" : "" + line.cx2);
				mm2.set("y",line.cy2 == null ? "null" : "" + line.cy2);
				if(showNav) {
					schema_UMLToSVG.addNavLabel(link1,link2,line,2,g);
					schema_UMLToSVG.addNavLabel(link2,link1,line,1,g);
				}
			}
			g.addChild(mm1);
			g.addChild(mm2);
		}
		return g;
	}
	static addNavLabel(link,oppositeLink,line,end,g) {
		if(!link.hasArrow) {
			let fName = oppositeLink.classRole;
			if(oppositeLink.role == "") {
				fName = link.max == "N" ? oppositeLink.set.getPluralClassName() : oppositeLink.set.className;
			}
			let visibility;
			switch(oppositeLink.visibility) {
			case model_Field.ACCESS_PRIVATE:
				visibility = "-";
				break;
			case model_Field.ACCESS_PROTECTED:
				visibility = "#";
				break;
			case model_Field.ACCESS_PUBLIC:
				visibility = "+";
				break;
			default:
				visibility = "";
			}
			fName = visibility + fName.charAt(0).toLowerCase() + HxOverrides.substr(fName,1,null);
			let text = Xml.createElement("text");
			text.addChild(Xml.createPCData(fName));
			let x = end == 1 ? line.x1 : line.x2;
			let y = end == 1 ? line.y1 : line.y2;
			let cx = end == 1 ? line.cx1 : line.cx2;
			let cy = end == 1 ? line.cy1 : line.cy2;
			text.set("x",Std.string(x < cx ? cx : cx - 9.5 * (fName.length - link.getUMLCards().length)));
			if(link.isWeak || link.isAgregate) {
				text.set("y",cy == null ? "null" : "" + cy);
			} else {
				text.set("y",Std.string(y < cy ? cy + 16 : cy - 16));
			}
			g.addChild(text);
		}
	}
}
$hx_exports["schema"]["UMLToSVG"] = schema_UMLToSVG;
schema_UMLToSVG.__name__ = true;
class source_Mocodo {
	static deComment(line) {
		let posComment = line.indexOf("//");
		if(posComment != -1) {
			line = line.substring(0,posComment);
		}
		let startComment = line.indexOf("/*");
		let endComment = line.indexOf("*/",startComment + 2);
		while(startComment != -1 && endComment != -1) {
			line = line.substring(0,startComment) + line.substring(endComment + 2);
			startComment = line.indexOf("/*");
			endComment = line.indexOf("*/",startComment + 2);
		}
		return line;
	}
	static load(mocodoText) {
		let lines = mocodoText.split("\n");
		let diagram = new model_Diagram();
		try {
			source_Mocodo.loadSets(diagram,lines);
			source_Mocodo.loadAssociations(diagram,lines);
			source_Mocodo.loadSubsets(diagram,lines);
			source_Mocodo.loadMethods(diagram,lines);
			source_Mocodo.loadLayout(diagram,lines);
		} catch( _g ) {
			let _g1 = haxe_Exception.caught(_g);
			if(typeof(_g1.unwrap()) == "string") {
				diagram = null;
			} else {
				let e = _g1;
				$global.console.log(e.get_message());
			}
		}
		let tmp;
		if(diagram != null) {
			let h = diagram.sets.h;
			let inlStringMapValueIterator_h = h;
			let inlStringMapValueIterator_keys = Object.keys(h);
			let inlStringMapValueIterator_length = inlStringMapValueIterator_keys.length;
			let inlStringMapValueIterator_current = 0;
			tmp = inlStringMapValueIterator_current >= inlStringMapValueIterator_length;
		} else {
			tmp = false;
		}
		if(tmp) {
			diagram = null;
		}
		return diagram;
	}
	static loadAssociations(diagram,lines) {
		let _g = 0;
		let _g1 = lines.length;
		while(_g < _g1) {
			let lineIndex = _g++;
			let line = source_Mocodo.deComment(lines[lineIndex]);
			if(source_Mocodo.associationRE.match(line)) {
				let name = StringTools.trim(line.substring(0,line.indexOf(",")));
				let assoc = new model_Association(name);
				let posColumn = line.indexOf(":");
				if(posColumn == -1) {
					posColumn = line.length;
				}
				let fields = line.substring(posColumn + 1).split(",");
				let _g = 0;
				let _g1 = fields.length;
				while(_g < _g1) {
					let i = _g++;
					let field = StringTools.trim(fields[i]);
					if(field != "") {
						source_Mocodo.loadField(assoc,null,field);
					}
				}
				diagram.associations.h[name] = assoc;
			}
		}
		let _g2 = 0;
		let _g3 = lines.length;
		while(_g2 < _g3) {
			let lineIndex = _g2++;
			let line = lines[lineIndex];
			if(source_Mocodo.associationRE.match(line)) {
				let name = StringTools.trim(line.substring(0,line.indexOf(",")));
				let assoc = diagram.associations.h[name];
				let posColumn = line.indexOf(":");
				if(posColumn == -1) {
					posColumn = line.length;
				}
				let links = line.substring(line.indexOf(",") + 1,posColumn).split(",");
				source_Mocodo.loadAssociationLinks(diagram,lineIndex,assoc,links);
			}
		}
	}
	static loadAssociationLinks(diagram,lineIndex,assoc,links) {
		let compoundSet = null;
		let componentSet = null;
		let _g = 0;
		let _g1 = links.length;
		while(_g < _g1) {
			let i = _g++;
			let link = StringTools.trim(links[i]);
			let role = link.replace(source_Mocodo.linkRE.r,"$1");
			if(role != "") {
				role = HxOverrides.substr(role,1,role.length - 2);
			}
			let setName = StringTools.trim(link.replace(source_Mocodo.linkRE.r,"$2"));
			let isWeak = false;
			let isAgregate = false;
			let hasArrow = false;
			let visibility = model_Field.ACCESS_UNSET;
			let set = diagram.sets.h[setName];
			if(set == null) {
				set = diagram.associations.h[setName];
				if(set != null) {
					(js_Boot.__cast(set , model_Association)).isAgregation = true;
				}
			}
			if(set != null) {
				while(link.charAt(0) == "_" || link.charAt(0) == "*" || link.charAt(0) == "o" || link.charAt(0) == "-" || link.charAt(0) == "+" || link.charAt(0) == "#") {
					switch(link.charAt(0)) {
					case "#":
						visibility = model_Field.ACCESS_PROTECTED;
						break;
					case "*":case "_":
						componentSet = set;
						isWeak = true;
						break;
					case "+":
						visibility = model_Field.ACCESS_PUBLIC;
						break;
					case "-":
						visibility = model_Field.ACCESS_PRIVATE;
						break;
					case "o":
						isAgregate = true;
						break;
					}
					link = link.substring(1);
				}
				if(!isWeak) {
					compoundSet = set;
				}
				let min = link.charAt(0);
				let max = link.charAt(1);
				if(link.charAt(2) == ">") {
					hasArrow = true;
				}
				assoc.links.push(new model_Link(set,role,min,max,isWeak,isAgregate,hasArrow,visibility));
			}
		}
		if(componentSet != null) {
			componentSet.compound = compoundSet;
		}
	}
	static loadSets(diagram,lines) {
		let _g = 0;
		while(_g < lines.length) {
			let line = lines[_g];
			++_g;
			line = source_Mocodo.deComment(line);
			if(source_Mocodo.entityRE.match(line)) {
				let name = StringTools.trim(line.substring(0,line.indexOf(":")));
				let isInterface = false;
				let set = new model_Set(name,null,false,isInterface);
				let lineSubStr = StringTools.trim(line.substring(line.indexOf(":") + 1));
				if(lineSubStr != "") {
					let fields = lineSubStr.split(",");
					let _g = 0;
					let _g1 = fields.length;
					while(_g < _g1) {
						let i = _g++;
						source_Mocodo.loadField(set,i,StringTools.trim(fields[i]));
					}
				}
				diagram.sets.h[name] = set;
			}
		}
	}
	static loadField(set,fieldIndex,name) {
		if(fieldIndex == null) {
			fieldIndex = -1;
		}
		let type = source_Mocodo.DEFAULT_TYPE;
		let visibility = model_Field.ACCESS_UNSET;
		let isStatic = false;
		let idSwap = false;
		if(source_Mocodo.typeRE.match(name)) {
			type = StringTools.trim(name.replace(source_Mocodo.typeRE.r,"$2"));
			name = StringTools.trim(name.replace(source_Mocodo.typeRE.r,"$1"));
		}
		while(name.charAt(0) == "_" || name.charAt(0) == "~" || name.charAt(0) == "-" || name.charAt(0) == "+" || name.charAt(0) == "#") {
			switch(name.charAt(0)) {
			case "#":
				visibility = model_Field.ACCESS_PROTECTED;
				break;
			case "+":
				visibility = model_Field.ACCESS_PUBLIC;
				break;
			case "-":
				visibility = model_Field.ACCESS_PRIVATE;
				break;
			case "_":
				idSwap = true;
				break;
			case "~":
				isStatic = true;
				break;
			}
			name = HxOverrides.substr(name,1,null);
		}
		if(!((set) instanceof model_Association)) {
			if(fieldIndex == 0 && !idSwap || fieldIndex != 0 && idSwap) {
				set.id.push(name);
			}
		}
		set.fields.push(new model_Field(name,type,visibility,isStatic));
	}
	static loadSubsets(diagram,lines) {
		let _g = 0;
		let _g1 = lines.length;
		while(_g < _g1) {
			let lineIndex = _g++;
			let line = source_Mocodo.deComment(lines[lineIndex]);
			if(source_Mocodo.legacySubsetRE.match(line)) {
				let type = line.replace(source_Mocodo.legacySubsetRE.r,"$4");
				let supersetName = StringTools.trim(line.replace(source_Mocodo.legacySubsetRE.r,"$5"));
				let superset = diagram.sets.h[supersetName];
				if(superset != null) {
					superset.subsetType = type;
					if(type == "XT" || type == "TX" || type == "P") {
						superset.isAbstract = true;
					}
					let children = line.replace(source_Mocodo.legacySubsetRE.r,"$1").split(" U ");
					let _g = 0;
					let _g1 = children.length;
					while(_g < _g1) {
						let i = _g++;
						let childName = StringTools.trim(children[i]);
						let child = diagram.sets.h[childName];
						if(child != null) {
							superset.subsets.push(child);
							child.id = [];
							child.superset = superset;
						}
					}
				}
			} else if(source_Mocodo.subsetRE.match(line)) {
				let type = line.replace(source_Mocodo.subsetRE.r,"$1");
				let supersetName = StringTools.rtrim(line.replace(source_Mocodo.subsetRE.r,"$2"));
				let superset = diagram.sets.h[supersetName];
				if(superset != null) {
					superset.subsetType = type;
					let tmp;
					switch(line.replace(source_Mocodo.subsetRE.r,"$3")) {
					case "-":
						tmp = model_Set.SUBSET_OPT_BOTH;
						break;
					case "<":
						tmp = model_Set.SUBSET_OPT_PARENT;
						break;
					case ">":
						tmp = model_Set.SUBSET_OPT_CHILDREN;
						break;
					default:
						tmp = -1;
					}
					superset.subsetOption = tmp;
					if(type == "XT" || type == "TX" || type == "P") {
						superset.isAbstract = true;
					}
					let classType = line.replace(source_Mocodo.subsetRE.r,"$4");
					if(classType != "") {
						superset.subsetCode = HxOverrides.substr(classType,1,classType.length - 2);
					}
					let children = line.replace(source_Mocodo.subsetRE.r,"$5").split(",");
					let _g = 0;
					let _g1 = children.length;
					while(_g < _g1) {
						let i = _g++;
						let childName = StringTools.trim(children[i]);
						let child = diagram.sets.h[childName];
						if(child != null) {
							superset.subsets.push(child);
							child.id.shift();
							child.superset = superset;
						}
					}
				}
			}
		}
	}
	static loadMethods(diagram,lines) {
		let _g = 0;
		let _g1 = lines.length;
		while(_g < _g1) {
			let lineIndex = _g++;
			let line = source_Mocodo.deComment(lines[lineIndex]);
			if(source_Mocodo.methodRE.match(line)) {
				let className = StringTools.trim(line.substring(0,line.indexOf(":") - 2));
				let set = diagram.sets.h[className];
				if(set == null) {
					set = new model_Set(className,null,false,true,true);
					diagram.sets.h[className] = set;
				}
				let lineSubStr = line.substring(line.indexOf(":") + 1);
				let start = 0;
				let end = lineSubStr.indexOf(")",start);
				while(end != -1) {
					let next = lineSubStr.indexOf(",",end);
					let lob = lineSubStr.indexOf("[",end);
					let lcb = lineSubStr.indexOf("]",end);
					if(lob != -1 && next > lob && next < lcb) {
						next = lineSubStr.indexOf(",",lcb);
					}
					let methodStr;
					if(next != -1) {
						methodStr = lineSubStr.substring(start,next);
						start = next + 1;
						end = lineSubStr.indexOf(")",start);
					} else {
						methodStr = lineSubStr.substring(start);
						end = -1;
					}
					source_Mocodo.loadMethod(set,StringTools.trim(methodStr));
				}
			}
		}
	}
	static loadMethod(set,methodStr) {
		let visibility = model_Field.ACCESS_PUBLIC;
		let isStatic = false;
		let name = StringTools.trim(methodStr.substring(0,methodStr.indexOf("(")));
		let type = methodStr.substring(methodStr.indexOf(")") + 1);
		type = StringTools.trim(type.substring(type.indexOf("[") + 1,type.indexOf("]")));
		let firstChar = name.charAt(0);
		while(firstChar == "~" || firstChar == "-" || firstChar == "+" || firstChar == "#") {
			switch(firstChar) {
			case "#":
				visibility = model_Field.ACCESS_PROTECTED;
				break;
			case "+":
				visibility = model_Field.ACCESS_PUBLIC;
				break;
			case "-":
				visibility = model_Field.ACCESS_PRIVATE;
				break;
			case "~":
				isStatic = true;
				break;
			}
			name = HxOverrides.substr(name,1,null);
			firstChar = name.charAt(0);
		}
		if(name == "") {
			name = set.name;
		}
		let method = new model_Method(name,type,visibility,isStatic);
		let paramsStr = StringTools.trim(methodStr.substring(methodStr.indexOf("(") + 1,methodStr.indexOf(")")));
		if(paramsStr != "") {
			source_Mocodo.loadParams(set,method,paramsStr);
		}
		if(name == set.name) {
			set.constructors.push(method);
		} else {
			set.methods.push(method);
		}
	}
	static loadParams(set,method,paramsStr) {
		let _g = 0;
		let _g1 = paramsStr.split(",");
		while(_g < _g1.length) {
			let paramSubStr = _g1[_g];
			++_g;
			let name = StringTools.trim(paramSubStr);
			let type = "";
			if(paramSubStr.indexOf("[") != -1) {
				name = StringTools.trim(paramSubStr.substring(0,paramSubStr.indexOf("[")));
				if(paramSubStr.indexOf("]",paramSubStr.indexOf("[")) != -1) {
					type = StringTools.trim(paramSubStr.substring(paramSubStr.indexOf("[") + 1,paramSubStr.indexOf("]")));
				}
			}
			if(type == "") {
				let field = set.getField(name);
				if(field != null) {
					type = field.dbType;
				} else {
					type = source_Mocodo.DEFAULT_TYPE;
				}
			}
			method.params.push(new model_Field(name,type));
		}
	}
	static loadLayout(diagram,lines) {
		let maxCol = 0;
		let col = 0;
		let row = 0;
		let _g = 0;
		while(_g < lines.length) {
			let line = lines[_g];
			++_g;
			line = source_Mocodo.deComment(line);
			if(StringTools.trim(line) == "") {
				if(col != 0) {
					if(col > maxCol) {
						maxCol = col;
					}
					col = 0;
					++row;
				}
			} else {
				let set = null;
				if(StringTools.trim(line) == ":") {
					++col;
				} else if(source_Mocodo.entityRE.match(line)) {
					let _this = diagram.sets;
					let key = StringTools.trim(line.substring(0,line.indexOf(":")));
					set = _this.h[key];
					set.row = row;
					set.col = col;
					++col;
				} else if(source_Mocodo.associationRE.match(line)) {
					let _this = diagram.associations;
					let key = StringTools.trim(line.substring(0,line.indexOf(",")));
					set = _this.h[key];
					set.row = row;
					set.col = col;
					++col;
				}
			}
		}
		diagram.height = row;
		diagram.width = maxCol;
	}
	static save(diagram) {
		let mocodoText = "";
		let grid = diagram.getGrid();
		let _g = 0;
		let _g1 = grid.length;
		while(_g < _g1) {
			let lineIndex = _g++;
			let _g1 = 0;
			let _g2 = grid[lineIndex];
			while(_g1 < _g2.length) {
				let set = _g2[_g1];
				++_g1;
				if(set == null) {
					mocodoText += ":";
				} else if(((set) instanceof model_Association)) {
					mocodoText += source_Mocodo.saveAssociation(js_Boot.__cast(set , model_Association));
				} else {
					mocodoText += source_Mocodo.saveSet(set);
				}
				mocodoText += "\n";
			}
			if(lineIndex != grid.length - 1) {
				mocodoText += "\n";
			}
		}
		return mocodoText;
	}
	static saveAssociation(assoc) {
		let mocodoText = assoc.name;
		let _g = 0;
		let _g1 = assoc.links;
		while(_g < _g1.length) {
			let link = _g1[_g];
			++_g;
			mocodoText += ", " + (link.isWeak ? "_" : "") + link.min + link.max + " " + link.set.name;
		}
		let _g2 = 0;
		let _g3 = assoc.fields.length;
		while(_g2 < _g3) {
			let fieldIndex = _g2++;
			if(fieldIndex != 0) {
				mocodoText += ", ";
			} else {
				mocodoText += ": ";
			}
			mocodoText += assoc.fields[fieldIndex].name + " [" + assoc.fields[fieldIndex].type + "]";
		}
		return mocodoText;
	}
	static saveSet(set) {
		let mocodoText = set.name + ": ";
		let _g = [];
		let x = $getIterator(set.fields);
		while(x.hasNext()) {
			let x1 = x.next();
			_g.push(x1.name + " [" + x1.type + "]");
		}
		mocodoText += "_" + _g.join(", ");
		if(set.subsets.length != 0) {
			let mocodoText1 = "\n/\\ " + set.name + " - ";
			let _g = [];
			let x = $getIterator(set.subsets);
			while(x.hasNext()) {
				let x1 = x.next();
				_g.push(x1.name);
			}
			mocodoText += mocodoText1 + _g.join(", ");
		}
		return mocodoText;
	}
}
$hx_exports["source"]["Mocodo"] = source_Mocodo;
source_Mocodo.__name__ = true;
class transform_DiagramToMLD {
	static transform(diagram) {
		let mld = new model_MLD();
		transform_DiagramToMLD.setsToRelations(diagram,mld);
		transform_DiagramToMLD.subsetsToRelations(diagram,mld);
		transform_DiagramToMLD.componentsToRelations(diagram,mld);
		transform_DiagramToMLD.associationsToRelations(diagram,mld);
		transform_DiagramToMLD.supersetToChildren(diagram,mld);
		transform_DiagramToMLD.subsetsToParent(diagram,mld);
		transform_DiagramToMLD.copyLayout(diagram,mld);
		let unneeded = [];
		Lambda.iter(mld.relations,function(r) {
			if(r.foreignKeys.length == 0 && r.key.length == r.fields.length) {
				unneeded.push(r.name);
			}
		});
		Lambda.iter(unneeded,function(rName) {
			let _this = mld.relations;
			if(Object.prototype.hasOwnProperty.call(_this.h,rName)) {
				delete(_this.h[rName]);
			}
		});
		let _g = 0;
		while(_g < unneeded.length) {
			let rName = unneeded[_g];
			++_g;
			Lambda.iter(mld.relations,function(r) {
				r.foreignKeys = Lambda.filter(r.foreignKeys,function(fk) {
					return fk.relation.name != rName;
				});
			});
		}
		return mld;
	}
	static setsToRelations(diagram,mld) {
		let h = diagram.sets.h;
		let set_h = h;
		let set_keys = Object.keys(h);
		let set_length = set_keys.length;
		let set_current = 0;
		while(set_current < set_length) {
			let set = set_h[set_keys[set_current++]];
			let eName = set.dbName;
			let r = new model_Relation(eName);
			let _g = 0;
			let _g1 = set.fields;
			while(_g < _g1.length) {
				let f = _g1[_g];
				++_g;
				let fName = f.className;
				if(!f.isStatic) {
					r.fields.push(new model_Field(fName,f.type));
					if(set.id.indexOf(f.name) != -1) {
						r.key.push(fName);
					}
				}
			}
			mld.relations.h[eName] = r;
		}
	}
	static subsetsToRelations(diagram,mld) {
		let h = diagram.sets.h;
		let set_h = h;
		let set_keys = Object.keys(h);
		let set_length = set_keys.length;
		let set_current = 0;
		while(set_current < set_length) {
			let set = set_h[set_keys[set_current++]];
			if(set.superset != null) {
				let r = mld.relations.h[set.dbName];
				let pr = mld.relations.h[set.superset.dbName];
				let hasProperKey = r.key.length != 0;
				let pos = 0;
				let _g = 0;
				let _g1 = pr.key;
				while(_g < _g1.length) {
					let fName = _g1[_g];
					++_g;
					if(!hasProperKey) {
						r.key.push(fName);
					}
					let pField = pr.getField(fName);
					let _this = r.fields;
					let x = new model_Field(fName,pField.dbType);
					_this.splice(pos,0,x);
					++pos;
					r.foreignKeys.push({ name : fName, relation : pr, key : fName});
				}
			}
		}
	}
	static componentsToRelations(diagram,mld) {
		let h = diagram.sets.h;
		let set_h = h;
		let set_keys = Object.keys(h);
		let set_length = set_keys.length;
		let set_current = 0;
		while(set_current < set_length) {
			let set = set_h[set_keys[set_current++]];
			if(set.compound != null) {
				let r = mld.relations.h[set.dbName];
				let pos = 0;
				let cr = mld.relations.h[set.compound.dbName];
				let _g = 0;
				let _g1 = cr.key;
				while(_g < _g1.length) {
					let fName = _g1[_g];
					++_g;
					r.key.splice(pos,0,fName);
					let cField = cr.getField(fName);
					let cType = cField.dbType;
					let _this = r.fields;
					let x = new model_Field(fName,cType);
					_this.splice(pos,0,x);
					r.foreignKeys.push({ name : fName, relation : cr, key : fName});
					++pos;
				}
			}
		}
	}
	static associationsToRelations(diagram,mld) {
		let associations = [];
		let h = diagram.associations.h;
		let assoc_h = h;
		let assoc_keys = Object.keys(h);
		let assoc_length = assoc_keys.length;
		let assoc_current = 0;
		while(assoc_current < assoc_length) {
			let assoc = assoc_h[assoc_keys[assoc_current++]];
			associations.push(assoc);
		}
		while(associations.length != 0) {
			let assoc = associations.pop();
			if(Lambda.exists(assoc.links,function(l) {
				return mld.relations.h[l.set.dbName] == null;
			})) {
				associations.splice(0,0,assoc);
				continue;
			}
			if(assoc.isRelation()) {
				transform_DiagramToMLD.associationNNtoRelation(diagram,mld,assoc);
			} else {
				transform_DiagramToMLD.association1NtoRelation(diagram,mld,assoc);
			}
		}
	}
	static association1NtoRelation(diagram,mld,assoc) {
		let l1 = null;
		let ln = null;
		let _g = 0;
		let _g1 = assoc.links;
		while(_g < _g1.length) {
			let l = _g1[_g];
			++_g;
			if(l.max == "1") {
				if(l1 == null) {
					l1 = l;
				} else if(l.min == "1") {
					ln = l1;
					l1 = l;
				} else {
					ln = l;
				}
			} else {
				ln = l;
			}
		}
		if(l1 != null && ln != null) {
			let r1 = mld.relations.h[l1.set.dbName];
			if(!l1.isWeak) {
				transform_DiagramToMLD.addForeignKey(diagram,mld,ln,r1,false);
			}
		}
	}
	static associationNNtoRelation(diagram,mld,assoc) {
		let r = new model_Relation(assoc.dbName);
		let nnAssoc = assoc.isNN();
		let _g = 0;
		let _g1 = assoc.links;
		while(_g < _g1.length) {
			let link = _g1[_g];
			++_g;
			transform_DiagramToMLD.addForeignKey(diagram,mld,link,r,nnAssoc || link.max == "1");
		}
		let _g2 = 0;
		let _g3 = assoc.fields;
		while(_g2 < _g3.length) {
			let field = _g3[_g2];
			++_g2;
			if(!field.isStatic) {
				r.fields.push(new model_Field(field.className,field.type));
			}
		}
		mld.relations.h[assoc.dbName] = r;
	}
	static addForeignKey(diagram,mld,l,r,pk) {
		let rl = mld.relations.h[l.set.dbName];
		if(rl == null) {
			rl = mld.relations.h[l.set.superset.dbName];
		}
		let _g = 0;
		let _g1 = rl.key;
		while(_g < _g1.length) {
			let k = _g1[_g];
			++_g;
			let fName = transform_DiagramToMLD.constructFieldName(r,k,l.classRole,rl.dbName,rl.key.length == 1);
			let rField = rl.getField(k);
			let fType = rField.dbType;
			r.fields.push(new model_Field(fName,fType));
			r.foreignKeys.push({ name : fName, relation : rl, key : k});
			if(pk) {
				r.key.push(fName);
			}
		}
	}
	static constructFieldName(r,k,role,rName,isSingleField) {
		let fName = "";
		if(role != "") {
			if(isSingleField) {
				fName = role;
			} else {
				fName = k + (HxOverrides.cca(k,k.length - 1) >= 97 && HxOverrides.cca(role,0) <= 90 ? role.charAt(0).toUpperCase() + role.substring(1) : "_" + role);
			}
		} else if(k.toLowerCase().indexOf(rName.toLowerCase()) == -1 && k.length < 5) {
			fName = k + (HxOverrides.cca(k,k.length - 1) >= 97 && HxOverrides.cca(rName,0) <= 90 ? rName.charAt(0).toUpperCase() + rName.substring(1) : "_" + rName);
		} else {
			fName = k;
		}
		let _this = r.fields;
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = _this[i].name;
		}
		let usedFields = result;
		let tryName = fName;
		let num = 0;
		while(usedFields.indexOf(tryName) != -1) {
			++num;
			tryName = fName + (num == null ? "null" : "" + num);
		}
		fName = tryName;
		return fName;
	}
	static subsetsToParent(diagram,mld) {
		let h = diagram.sets.h;
		let set_h = h;
		let set_keys = Object.keys(h);
		let set_length = set_keys.length;
		let set_current = 0;
		while(set_current < set_length) {
			let set = set_h[set_keys[set_current++]];
			if(set.subsetOption == model_Set.SUBSET_OPT_PARENT) {
				let pr = mld.relations.h[set.dbName];
				if(set.subsetCode != "") {
					pr.fields.push(new model_Field(set.subsetCode,"INT"));
				}
				let _g = 0;
				let _g1 = set.subsets;
				while(_g < _g1.length) {
					let c = _g1[_g];
					++_g;
					let cr = mld.relations.h[c.dbName];
					Lambda.iter(cr.fields,function(f) {
						if(pr.key.indexOf(f.name) == -1) {
							pr.fields.push(f);
						}
					});
					Lambda.iter(cr.foreignKeys,function(fk) {
						if(fk.relation.name != pr.name) {
							pr.foreignKeys.push(fk);
						}
					});
					Lambda.iter(mld.relations,function(r) {
						Lambda.iter(r.foreignKeys,function(fk) {
							if(fk.relation.name == cr.name) {
								fk.relation = pr;
							}
						});
					});
					let _this = mld.relations;
					let key = cr.name;
					if(Object.prototype.hasOwnProperty.call(_this.h,key)) {
						delete(_this.h[key]);
					}
				}
			}
		}
	}
	static supersetToChildren(diagram,mld) {
		let h = diagram.sets.h;
		let set_h = h;
		let set_keys = Object.keys(h);
		let set_length = set_keys.length;
		let set_current = 0;
		while(set_current < set_length) {
			let set = set_h[set_keys[set_current++]];
			let pr = mld.relations.h[set.dbName];
			let _g = [];
			let x = $getIterator(set.subsets);
			while(x.hasNext()) {
				let x1 = x.next();
				_g.push(x1.dbName);
			}
			let subsetsNames = _g;
			let subsetType = set.subsetType.toUpperCase();
			let refCount = Lambda.count(mld.relations,function(r) {
				if(subsetsNames.indexOf(r.name) == -1) {
					return Lambda.exists(r.foreignKeys,function(fk) {
						return fk.relation.name == pr.name;
					});
				} else {
					return false;
				}
			});
			if(set.subsetOption == model_Set.SUBSET_OPT_CHILDREN && refCount == 0 && (set.subsets.length == 1 || subsetType == "X" || subsetType == "XT" || subsetType == "TX" || subsetType == "P")) {
				let _g = 0;
				let _g1 = set.subsets;
				while(_g < _g1.length) {
					let c = _g1[_g];
					++_g;
					let cr = mld.relations.h[c.dbName];
					let pos = cr.key.length - 1;
					let _g2 = 0;
					let _g3 = pr.fields;
					while(_g2 < _g3.length) {
						let f = _g3[_g2];
						++_g2;
						if(pr.key.indexOf(f.name) == -1) {
							cr.fields.splice(pos,0,f);
						}
						++pos;
					}
					Lambda.iter(pr.foreignKeys,function(fk) {
						cr.foreignKeys.push(fk);
					});
					if(set.subsets.length == 1 || subsetType == "XT" || subsetType == "TX" || subsetType == "P") {
						let supersetFK = [];
						Lambda.iter(cr.foreignKeys,function(fk) {
							if(fk.relation.name == pr.name) {
								supersetFK.push(fk);
							}
						});
						Lambda.iter(supersetFK,function(fk) {
							HxOverrides.remove(cr.foreignKeys,fk);
						});
					}
				}
				if(set.subsets.length == 1 || subsetType == "XT" || subsetType == "TX" || subsetType == "P") {
					let _this = mld.relations;
					let key = pr.name;
					if(Object.prototype.hasOwnProperty.call(_this.h,key)) {
						delete(_this.h[key]);
					}
				}
			}
		}
	}
	static copyLayout(diagram,mld) {
		mld.height = diagram.height;
		mld.width = diagram.width;
		let _g = [];
		let _g1 = 0;
		let _g2 = mld.height;
		while(_g1 < _g2) {
			let i = _g1++;
			_g.push(0);
		}
		let rows = _g;
		let _g3 = [];
		let _g4 = 0;
		let _g5 = mld.width;
		while(_g4 < _g5) {
			let i = _g4++;
			_g3.push(0);
		}
		let columns = _g3;
		let o = diagram.iterator();
		while(o.hasNext()) {
			let o1 = o.next();
			let r = mld.relations.h[o1.dbName];
			if(r != null) {
				r.row = o1.row;
				r.col = o1.col;
				rows[r.row]++;
				columns[r.col]++;
			}
		}
		let empty = 0;
		let _g6 = 0;
		let _g7 = rows.length;
		while(_g6 < _g7) {
			let i = _g6++;
			if(rows[i] == 0) {
				++empty;
			} else {
				rows[i] = i - empty;
			}
		}
		mld.height -= empty;
		empty = 0;
		let _g8 = 0;
		let _g9 = columns.length;
		while(_g8 < _g9) {
			let i = _g8++;
			if(columns[i] == 0) {
				++empty;
			} else {
				columns[i] = i - empty;
			}
		}
		mld.width -= empty;
		let h = mld.relations.h;
		let r_h = h;
		let r_keys = Object.keys(h);
		let r_length = r_keys.length;
		let r_current = 0;
		while(r_current < r_length) {
			let r = r_h[r_keys[r_current++]];
			r.row = rows[r.row];
			r.col = columns[r.col];
		}
	}
}
$hx_exports["transform"]["DiagramToMLD"] = transform_DiagramToMLD;
transform_DiagramToMLD.__name__ = true;
class transform_DiagramToUML {
	static transform(diagram) {
		transform_DiagramToUML.initNavigation(diagram);
		transform_DiagramToUML.initConstructors(diagram);
		transform_DiagramToUML.initAccessors(diagram);
	}
	static initNavigation(diagram) {
		let h = diagram.associations.h;
		let assoc_h = h;
		let assoc_keys = Object.keys(h);
		let assoc_length = assoc_keys.length;
		let assoc_current = 0;
		while(assoc_current < assoc_length) {
			let assoc = assoc_h[assoc_keys[assoc_current++]];
			if(assoc.isClass()) {
				let _g = 0;
				let _g1 = assoc.links;
				while(_g < _g1.length) {
					let link = _g1[_g];
					++_g;
					assoc.navFields.push(new model_Field(transform_DiagramToUML.constructFieldName(link,"1"),link.set.className,link.visibility));
				}
			} else if(assoc.links.length == 2) {
				if(!assoc.links[0].hasArrow) {
					let c1 = diagram.getObj(assoc.links[0].set.name);
					let field1Type = assoc.links[0].max == "1" ? assoc.links[1].set.className : model_Field.arrayOf(assoc.links[1].set.className);
					c1.navFields.push(new model_Field(transform_DiagramToUML.constructFieldName(assoc.links[1],assoc.links[0].max),field1Type,assoc.links[1].visibility));
				}
				if(!assoc.links[1].hasArrow) {
					let c2 = diagram.getObj(assoc.links[1].set.name);
					let field2Type = assoc.links[1].max == "1" ? assoc.links[0].set.className : model_Field.arrayOf(assoc.links[0].set.className);
					c2.navFields.push(new model_Field(transform_DiagramToUML.constructFieldName(assoc.links[0],assoc.links[1].max),field2Type,assoc.links[0].visibility));
				}
			}
		}
	}
	static constructFieldName(link,maxCard) {
		let fName = link.classRole;
		if(link.role == "") {
			fName = maxCard == "N" ? link.set.getPluralClassName() : link.set.className;
		}
		fName = fName.charAt(0).toLowerCase() + HxOverrides.substr(fName,1,null);
		return fName;
	}
	static initConstructors(diagram) {
		let set = diagram.iterator();
		while(set.hasNext()) {
			let set1 = set.next();
			if(set1.constructors.length == 0 && (!((set1) instanceof model_Association) || (js_Boot.__cast(set1 , model_Association)).isClass())) {
				let constructor = new model_Method(set1.className,"",set1.isAbstract ? model_Field.ACCESS_PROTECTED : model_Field.ACCESS_PUBLIC);
				let _g = 0;
				let _g1 = transform_DiagramToUML.retrieveConstructorFields(set1);
				while(_g < _g1.length) {
					let field = _g1[_g];
					++_g;
					constructor.params.push(new model_Field(field.className,field.classType));
				}
				set1.constructors.push(constructor);
			}
		}
	}
	static retrieveConstructorFields(set) {
		let fields;
		if(set.superset != null) {
			fields = transform_DiagramToUML.retrieveConstructorFields(set.superset);
		} else {
			fields = [];
		}
		let fieldSet = set.fields;
		let _g = 0;
		while(_g < fieldSet.length) {
			let field = fieldSet[_g];
			++_g;
			if(!field.isArray()) {
				fields.push(field);
			}
		}
		let fieldSet1 = set.navFields;
		let _g1 = 0;
		while(_g1 < fieldSet1.length) {
			let field = fieldSet1[_g1];
			++_g1;
			if(!field.isArray()) {
				fields.push(field);
			}
		}
		return fields;
	}
	static initAccessors(diagram) {
		let set = diagram.iterator();
		while(set.hasNext()) {
			let set1 = set.next();
			if(!((set1) instanceof model_Association) || (js_Boot.__cast(set1 , model_Association)).isClass()) {
				Lambda.iter(set1.fields,function(field) {
					transform_DiagramToUML.setAccessors(set1,field);
				});
				Lambda.iter(set1.navFields,function(field) {
					transform_DiagramToUML.setAccessors(set1,field);
				});
			}
		}
	}
	static setAccessors(set,field) {
		if(field.visibility == model_Field.ACCESS_UNSET) {
			field.visibility = model_Field.ACCESS_PROTECTED;
			let getters = new model_Method("get" + field.className.charAt(0).toUpperCase() + HxOverrides.substr(field.className,1,null),field.classType,model_Field.ACCESS_PUBLIC);
			set.accessors.push(getters);
			if(HxOverrides.substr(field.classType,0,5) == "Array") {
				let itemType = HxOverrides.substr(field.classType,6,field.classType.length - 7);
				let adders = new model_Method("add" + itemType,set.className,model_Field.ACCESS_PUBLIC);
				adders.params.push(new model_Field("item",itemType));
				set.accessors.push(adders);
				let removers = new model_Method("remove" + itemType,set.className,model_Field.ACCESS_PUBLIC);
				removers.params.push(new model_Field("item",itemType));
				set.accessors.push(removers);
			} else {
				let setters = new model_Method("set" + field.className.charAt(0).toUpperCase() + HxOverrides.substr(field.className,1,null),field.classType,model_Field.ACCESS_PUBLIC);
				setters.params.push(new model_Field(field.className,field.classType));
				set.accessors.push(setters);
			}
		}
	}
}
$hx_exports["transform"]["DiagramToUML"] = transform_DiagramToUML;
transform_DiagramToUML.__name__ = true;
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
{
	String.prototype.__class__ = String;
	String.__name__ = true;
	Array.__name__ = true;
	Date.prototype.__class__ = Date;
	Date.__name__ = "Date";
	var Int = { };
	var Dynamic = { };
	var Float = Number;
	var Bool = Boolean;
	var Class = { };
	var Enum = { };
}
js_Boot.__toStr = ({ }).toString;
Xml.Element = 0;
Xml.PCData = 1;
Xml.Document = 6;
code_HaxeCode.__meta__ = { statics : { generateMethods : { SuppressWarnings : ["checkstyle:CyclomaticComplexity"]}}};
code_JavaCode.__meta__ = { statics : { generateMethods : { SuppressWarnings : ["checkstyle:CyclomaticComplexity"]}}};
code_PythonCode.__meta__ = { statics : { generateMethods : { SuppressWarnings : ["checkstyle:CyclomaticComplexity"]}}};
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
model_Obj.__meta__ = { statics : { fixName : { SuppressWarnings : ["checkstyle:CyclomaticComplexity"]}}};
model_Set.SUBSET_OPT_BOTH = 0;
model_Set.SUBSET_OPT_CHILDREN = 1;
model_Set.SUBSET_OPT_PARENT = 2;
model_Field.ACCESS_UNSET = 0;
model_Field.ACCESS_PRIVATE = 1;
model_Field.ACCESS_PROTECTED = 2;
model_Field.ACCESS_PUBLIC = 3;
model_Link.__meta__ = { fields : { _ : { SuppressWarnings : ["checkstyle:ParameterNumber"]}}};
schema_Line.__meta__ = { fields : { _ : { SuppressWarnings : ["checkstyle:ParameterNumber"]}}};
schema_MCDToSVG.__meta__ = { statics : { generateLineCardsSVG : { SuppressWarnings : ["checkstyle:ParameterNumber"]}}};
schema_Svg.__meta__ = { statics : { getLine : { SuppressWarnings : ["checkstyle:CyclomaticComplexity"]}}};
schema_Svg.coordRE = new EReg("^translate\\(([0-9]+,[0-9]+)\\)$","");
schema_Svg.PADDING = 5;
schema_Svg.MARGIN = 50;
schema_Svg.IMARGIN = 10;
schema_Svg.RXY = 20;
schema_Svg.LETTER_HEIGHT = 16;
schema_Svg.TEXT_STYLE = "font-family:'Roboto Mono';font-size:16px";
schema_Svg.LETTER_WIDTH = 9.5;
schema_Svg.UNDERLINE_STYLE = "text-decoration:underline";
schema_Svg.RECT_STYLE = "stroke:black";
schema_Svg.LINE_STYLE = "fill:none;stroke:black";
schema_Svg.WHITE_STYLE = "fill:white;stroke:black";
schema_Svg.DOTTED_STYLE = "2,2";
schema_Svg.MARKERS = [{ id : "arrowMarker", height : 10, width : 5, path : "M 0 0 L " + 5 + " " + 5 + " L 0 " + 10 + " Z", style : "fill:black;stroke:black"},{ id : "inheritMarker", height : 15, width : 15, path : "M 0 0 L " + 15 + " " + 7.5 + " L 0 " + 15 + " Z", style : "fill:white;stroke:black"},{ id : "aggregationMarker", height : 15, width : 20, path : "M 0 " + 7.5 + " L " + 10 + " 0 L " + 20 + " " + 7.5 + " L " + 10 + " " + 15 + " Z", style : "fill:white;stroke:black"},{ id : "compositionMarker", height : 15, width : 20, path : "M 0 " + 7.5 + " L " + 10 + " 0 L " + 20 + " " + 7.5 + " L " + 10 + " " + 15 + " Z", style : "fill:black;stroke:black"}];
schema_Svg.FILL_WHITE_STYLE = "fill:white";
schema_Svg.FILL_GREY_STYLE = "fill:lightgrey";
schema_UMLToSVG.__meta__ = { statics : { drawLinks : { SuppressWarnings : ["checkstyle:ParameterNumber"]}}};
source_Mocodo.DEFAULT_TYPE = "VARCHAR(50)";
source_Mocodo.typeRE = new EReg("([^\\[]*)\\[(.*)\\]","");
source_Mocodo.entityRE = new EReg("^[^/,:(]{2,}:","");
source_Mocodo.associationRE = new EReg("^[^/,:]{2,},","");
source_Mocodo.legacySubsetRE = new EReg("([^/,:]{2,}( U [^,:]{2,})*) C( ?\\[(X?T?)\\])? ([^,:]{2,})$","i");
source_Mocodo.subsetRE = new EReg("^/([XT]{0,2}|P)?\\\\ * ([^-><]{2,}) *([-><]) *(\\[.*\\])? *(.*$)","i");
source_Mocodo.linkRE = new EReg("[^01NX]*[01NX]{2}>? *(\\[.*\\])?(.*)$","");
source_Mocodo.methodRE = new EReg("^[^/,:(]{2,}\\(\\):","");
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
