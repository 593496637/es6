report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\qq_map_0_document_0_phone.png",
        "test": "..\\bitmaps_test\\20211123-154641\\qq_map_0_document_0_phone.png",
        "selector": "document",
        "fileName": "qq_map_0_document_0_phone.png",
        "label": "map",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 4.377811094452774,
          "misMatchPercentage": "4.38",
          "analysisTime": 18
        },
        "diffImage": "..\\bitmaps_test\\20211123-154641\\failed_diff_qq_map_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\qq_map_0_document_1_tablet.png",
        "test": "..\\bitmaps_test\\20211123-154641\\qq_map_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "qq_map_0_document_1_tablet.png",
        "label": "map",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "tablet",
        "error": "Reference file not found G:\\es6\\YD\\demos\\karama-test\\backstop_data\\bitmaps_reference\\qq_map_0_document_1_tablet.png"
      },
      "status": "fail"
    }
  ],
  "id": "qq"
});