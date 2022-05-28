const reqmanager = require("./reqmanager")
reqmanager("https://discord.com/api/v8/applications/809405487023259719/guilds/714143849504833586/commands", "ODA5NDA1NDg3MDIzMjU5NzE5.YCUnmg.QtrBtcNoPPjEZ1DIedREI4cx4o8", {
  "name": "blep",
  "type": 1,
  "description": "Send a random adorable animal photo",
  "options": []
}, { method: "post" })
let obj = {
  type: 9,
  data: {
    custom_id: "cool_modal",
    title: "My Cool Modal",
    type: 5,
    components: [{
      type: 1,
      components: [{
        type: 4,
        custom_id: "name",
        label: "Name",
        style: 2,
        min_length: 1,
        value: "John",
        max_length: 4000,
        placeholder: "John",
        required: true
      }]
    }]
  }
}