const whatsappHelper = {
  messageType: (type, data) => {
    let dataObj = {};
    switch (type) {
      case 'audio':
        if ( data && data.phone && ( data.id || data.link) ) {
          if (data.id) {
            dataObj = {
              id: data.id,
            }
          } else {
            dataObj = {
              link: data.link,
            }
          }
        } else {
          return {
            message: 'error',
            error: 'Please provide phone (phone number) as well as id or link.',
          };
        }
        return {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: data.phone,
          type: 'audio',
          audio: dataObj,
        };
      case 'button':
        const btns = [];
        if ( data && data.phone && data.body && data.buttons ) {
          if (data.buttons.length > 3) {
            return {
              message: 'error',
              error: 'Maximum 3 buttons are allowed.',
            };
          }

          data.buttons.forEach((button) => {
            if (button.length === 0) {
              return {
                message: 'error',
                error: 'Empty buttons are not allowed.',
              };
            }
            btns.push({
              type: 'reply',
              reply: {
                id: button.id,
                title: button.title,
              },
            })
          });
        } else {
          return {
            message: 'error',
            error: 'Please provide phone (phone number), body and array of buttons.',
          };
        }
        return {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: data.phone,
          type: 'interactive',
          interactive: {
            type: 'button',
            header: data?.header,
            body: {
              text: data?.body,
            },
            footer: {
              text: data?.footer,
            },
            action: {
              buttons: btns,
            },
          },
        };
      case 'document':
        if ( data && data.phone && ( data.id || data.link ) ) {
          if ( data.id ) {
            dataObj = {
              id: data.id,
              caption: data?.caption,
              filename: data?.filename,
            };
          } else {
            dataObj = {
              link: data.link,
              caption: data?.caption,
              filename: data?.filename,
            };
          }
        } else {
          return {
            message: 'error',
            error: 'Please provide phone (phone number) as well as id or link.',
          };
        }
        return {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: data.phone,
          type: type,
          document: dataObj,
        };
      case 'image':
        if ( data && data.phone && ( data.id || data.link ) ) {
          if (data.id ) {
            dataObj = {
              id: data.id,
              caption: data?.caption,
            };
          } else {
            dataObj = {
              link: data.link,
              caption: data?.caption,
            };
          }
        } else {
          return {
            message: 'error',
            error: 'Please provide phone (phone number) as well as id or link.',
          };
        }
        return {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: data.phone,
          type: 'image',
          image: dataObj,
        };
      case 'list':
        const listItems = [];
        if ( data && data.phone && data.body && data.buttons && data.buttonTitle ) {
          if (data.buttons.length > 10) {
            return {
              message: 'error',
              error: 'Maximum 10 buttons are allowed.',
            };
          }

          data.buttons.forEach((button) => {
            if (button.title.length === 0) {
              return {
                message: 'error',
                error: 'Empty buttons are not allowed.',
              };
            }
            listItems.push({
              id: button.id,
              title: button.title,
              description: button?.description,
            });
          });
        } else {
          return {
            message: 'error',
            error: 'Please provide phone (phone number), body and array of buttons.',
          };
        }
        return {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: data.phone,
          type: 'interactive',
          interactive: {
            type: 'list',
            header: data?.header,
            body: {
              text: data.body,
            },
            footer: {
              text: data?.footer,
            },
            action: {
              sections: [
                {
                  rows: listItems,
                },
              ],
              button: data.buttonTitle,
            },
          },
        };
      case 'location':
        if (
          data
          && data.phone
          && data.latitude
          && data.longitude
        ) {
          dataObj = {
            latitude: data.latitude,
            longitude: data.longitude,
            name: data?.name,
            address: data?.address,
          };
        } else {
          return {
            message: 'error',
            error: 'Please provide phone (phone number) , latitude and longitude.',
          };
        }
        return {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: data.phone,
          type: 'location',
          location: dataObj,
        };
      case 'text':
        if ( !data.message || !data.phone ) {
          return {
            message: 'error',
            error: 'Please provide phone (phone number) and message.',
          };
        }
        return {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: data.phone,
          type: 'text',
          text: {
            preview_url: false,
            body: data.message,
          },
        };
      case 'video':
        if ( data && data.phone && ( data.id || data.link ) ) {
          if ( data.id ) {
            dataObj = {
              id: data.id,
              caption: data?.caption,
            };
          } else {
            dataObj = {
              link: data.link,
              caption: data?.caption,
            };
          }
        } else {
          return {
            message: 'error',
            error: 'Please provide phone (phone number) as well as id or link.',
          };
        }
        return {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: data.phone,
          type: 'video',
          video: dataObj,
        };
      default:
        if ( !data.phone ) {
          return {
            message: 'error',
            error: 'Please provide a valid phone number.'
          };
        }
        return {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: data.phone,
          type: 'text',
          text: {
            preview_url: false,
            body: 'Default Message',
          },
        };
    }
  },
};

export default whatsappHelper;
