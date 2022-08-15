var JsonChannelsData = {
    channels: []
};
var JsonidentifiersData = {
    identifiers: []
};
var JsonmessageData = {
    message: []
};

const utilityHelpers = {
   
    channelJSONGENRATOR: (channelsArray) => {
        var jsonData = {};
        channelsArray.forEach(function (channels) {
            var channelsName = channels.metadata.channelsName;
            jsonData[channelsName] = channels.value;
        });
        return JsonChannelsData.channels.push(jsonData);
    },
    
    identifierJSONGENRATOR: (identifierArray) => {
        var jsonData = {};
        identifierArray.forEach(function (identifiers) {
            var identifiersName = identifiers.metadata.channelsName;
            jsonData[identifiersName] = identifiers.value;
        });
        return JsonidentifiersData.identifiers.push(jsonData);
    },
    messageJSONGENRATOR: (messageArray) => {
        var jsonData = {};
        messageArray.forEach(function (message) {
            var messageName = message.metadata.messageName;
            jsonData[messageName] = message.value;
        });
        return JsonmessageData.message.push(jsonData);
    },

};
export default utilityHelpers;
