const swaggerDocs = {
  'swagger': '2.0',
  'info': {
    'version': '1.0.0',
    'title': 'Vaccination Booking API',
    'description': 'Vaccination reservation API',
  },
  'host': 'localhost:8000',
  'basePath': '/',
  'tags': [
    {
      'name': 'Users',
      'description': 'API for users in the system'
    },
    {
      'name': 'VaccinationCenter',
      'description': 'API for vaccination center related data in the system'
    },
    {
      'name': 'Admin',
      'description': 'API for upload vaccination center related Admin data in the system'
    }
  ],
  'schemes': ['http'],
  'consumes': ['application/json'],
  'produces': ['application/json'],
  'paths': {
    '/user/{userId}/vaccineStatus': {
      'parameters': [
        {
          'name': 'userId',
          'in': 'path',
          'required': true,
          'description': 'NIC of user that we want to get caccine status',
          'type': 'string'
        }
      ],
      'get': {
        'tags': [
          'Users'
        ],  
        'summary': 'Get User Vaccine status',
        'responses': {
          '200': {
            'description': 'OK',
            'schema': {
              '$ref': '#/definitions/Users'
            }
          }
        }
      },
      'post': {
        'tags': [
          'Users'
        ], 
        'parameters': [
          {
            'name': 'vaccine status',
            'in': 'body',
            'description': 'User vaccine status Object',
            'schema': {
              '$ref': '#/definitions/UserVaccineStatus'
            }
          }
        ],
        'produces': [
          'application/json'
        ], 
        'summary': 'Save User Vaccine status',
        'responses': {
          '201': {
            'description': 'CREATED',
            'schema': {
              '$ref': '#/definitions/Users'
            }
          }
        }
      },
      'delete': {
        'tags': [
          'Users'
        ],  
        'parameters': [
          {
            'name': 'vaccineSlotId',
            'in': 'query',
            'required': true,
            'description': 'vaccineSlotId of user that we want to remove vaccine status',
            'type': 'integer'
          }
        ],
        'summary': 'Delete User Vaccine status',
        'responses': {
          '200': {
            'description': 'OK',
            'schema': {
              '$ref': '#/definitions/Users'
            }
          }
        }
      },
    },
    '/vaccineCenter': {
      'get': {
        'tags': [
          'VaccinationCenter'
        ],  
        'summary': 'Get  Vaccine center list',
        'responses': {
          '200': {
            'description': 'OK',
            'schema': {
              '$ref': '#/definitions/VaccineCenterList'
            }
          }
        }
      }
    },
    '/vaccineCenter/availability': {
      'get': {
        'tags': [
          'VaccinationCenter'
        ],  
        'parameters': [
          {
            'name': 'vaccineCenterId',
            'in': 'query',
            'required': true,
            'description': 'vaccine center id',
            'type': 'string'
          }
        ],
        'summary': 'Get  Vaccine center availability',
        'responses': {
          '200': {
            'description': 'OK',
            'schema': {
              '$ref': '#/definitions/VaccineCenterAvailabilityList'
            }
          }
        }
      }
    },
    '/upload/vaccineCenter': {
      'post': {
        'tags': [
          'Admin'
        ],  
        'summary': 'Upload Vaccine Center List',
        'consumes': 'multipart/form-data',
        'parameters': [
          {
            'name': 'data',
            'in': 'formData',
            'required': true,
            'description': 'Vaccine Centers to be upload',
            'type': 'file'
          }],
        'responses': {
          '204': {
            'description': 'No Content'
          }
        }
      }
    },
    '/upload/resourceAvailability': {
      'post': {
        'tags': [
          'Admin'
        ],  
        'summary': 'Upload Time Slot List',
        'consumes': 'multipart/form-data',
        'parameters': [
          {
            'name': 'data',
            'in': 'formData',
            'required': true,
            'description': 'Time Slots',
            'type': 'file'
          }],
        'responses': {
          '204': {
            'description': 'No Content',
          }
        }
      }
    },
  },
  'definitions': {
    'User': {
      'required': ['id', 'nic', 'vaccineSlotId', 'status'],
      'properties': {
        'id': {
          'type': 'integer',
          'uniqueItems': true
        },
        'nic': {
          'type': 'string',
          'uniqueItems': true
        },
        'vaccineSlotId': {
          'type': 'integer',
          'uniqueItems': true
        },
        'status': {
          'type': 'string',
          
        },

      }
    },
    'Users': {
      'type': 'array',
      '$ref': '#/definitions/User'
    },
    'VaccineCenter': {
      'required': ['id', 'name'],
      'properties': {
        'id': {
          'type': 'string',
          'uniqueItems': true
        },
        'name': {
          'type': 'string',
          'uniqueItems': true
        }
      }
    },
    'VaccineCenterList': {
      'type': 'array',
      '$ref': '#/definitions/VaccineCenter'
    },
    'UserVaccineStatus': {
      'required': ['vaccineSlotId', 'status'],
      'properties': {
        'vaccineSlotId': {
          'type': 'integer',
          'uniqueItems': true
        },
        'status': {
          'type': 'string',
          'enum': ['PENDING']
        }
      } 
    },
    'VaccineCenterAvailabilityRecord': {
      'required': ['timseSlotId', 'validFrom', 'validTo', 'currentCount', 'maxCount' ],
      'properties': {
        'timseSlotId': {
          'type': 'integer',
        },
        'validFrom': {
          'type': 'date',
        },
        'validTo': {
          'type': 'date',
        },
        'currentCount': {
          'type': 'integer',
        },
        'maxCount': {
          'type': 'integer',
        }
      } 
    },
    'VaccineCenterAvailabilityList': {
        'type': 'array',
        '$ref': '#/definitions/VaccineCenterAvailabilityRecord'
      },

  }

}

export default swaggerDocs;