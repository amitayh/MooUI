/*
---

description: Base list item component

license: MIT-style

authors:
- Amitay Horwitz

requires:
- MooUI.List

provides:
- MooUI.List.Item

...
*/

MooUI.List.Item = new Class({

    Extends: MooUI.Component,

    options: {
        tag: 'li.mooui-component.mooui-list-item'
    },

    list: null

});