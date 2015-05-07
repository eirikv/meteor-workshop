Template.editProfile.events({
	"click .profileFormSubmit": function(e) {
		e.preventDefault();
		var data = $("form.profileForm").serializeArray();
		var profileInfo = _.object(_.pluck(data, "name"), _.pluck(data, "value"));
		
		Meteor.call("updateUserProfile", profileInfo, function(error, result) {
			delete Session.keys['nameChange'];

			if(error) {
				Notifications.error(error.error);
			} else {
				Notifications.success("Successfully updated profile :)")
			}
		});
	},

	"keyup input": function(e) {
		var id = $(e.currentTarget).attr('name');

		if(id === 'firstname' || id === 'lastname') {
			var name = $('input[name="firstname"]').val() + ' ' + $('input[name="lastname"]').val();

			Session.set('nameChange', name);
		}
	}
});