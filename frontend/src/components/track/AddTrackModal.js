import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setNotification } from '../../reducers/notificationReducer';
import {
  Modal,
  Header,
  Form,
  Button,
  Input,
  TextArea,
  Dropdown
} from 'semantic-ui-react';

const AddTrackModal = ({ setNotification }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [track, setTrack] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const [country, setCountry] = useState('');
  const [recordCountry, setRecordCountry] = useState('');
  const [people, setPeople] = useState('');
  const [discNo, setDiscNo] = useState('');
  const [trackNo, setTrackNo] = useState('');
  const [year, setYear] = useState('');
  const [label, setLabel] = useState('');
  const [catId, setCatId] = useState('');
  const [isrc, setIsrc] = useState('');
  const [comment, setComment] = useState('');

  const submitTrack = () => {
    console.log('klikd submit track');
    // artist name validation
    if (artist === null) {
      setNotification('Artisti on pakollinen tieto', 'fail');
    }
    const trackToAdd = {
      artist_name: artist,
      album_name: album,
      track_title: track,
      length: min * 60 + sec,
      country,
      record_country: recordCountry,
      people,
      disc_no: discNo,
      track_no: trackNo,
      year,
      label,
      cat_id: catId,
      isrc,
      comment
    };
    console.log(trackToAdd);
    handleClose();
  };

  const countryOptions = [
    {
      key: 1,
      text: 'Suomi',
      value: 1
    },
    {
      key: 2,
      text: 'Muu',
      value: 2
    },
    {
      key: 0,
      text: 'Ei tietoa',
      value: null
    }
  ];
  const getCountry = (event, { value }) => {
    event.preventDefault();
    setCountry(value);
  };
  const recordCountryOptions = [
    { text: 'Finland', value: 'FI' },
    { text: 'United Kingdom', value: 'GB' },
    { text: 'United States', value: 'US' },
    { text: 'Afghanistan', value: 'AF' },
    { text: 'Åland Islands', value: 'AX' },
    { text: 'Albania', value: 'AL' },
    { text: 'Algeria', value: 'DZ' },
    { text: 'American Samoa', value: 'AS' },
    { text: 'AndorrA', value: 'AD' },
    { text: 'Angola', value: 'AO' },
    { text: 'Anguilla', value: 'AI' },
    { text: 'Antarctica', value: 'AQ' },
    { text: 'Antigua and Barbuda', value: 'AG' },
    { text: 'Argentina', value: 'AR' },
    { text: 'Armenia', value: 'AM' },
    { text: 'Aruba', value: 'AW' },
    { text: 'Australia', value: 'AU' },
    { text: 'Austria', value: 'AT' },
    { text: 'Azerbaijan', value: 'AZ' },
    { text: 'Bahamas', value: 'BS' },
    { text: 'Bahrain', value: 'BH' },
    { text: 'Bangladesh', value: 'BD' },
    { text: 'Barbados', value: 'BB' },
    { text: 'Belarus', value: 'BY' },
    { text: 'Belgium', value: 'BE' },
    { text: 'Belize', value: 'BZ' },
    { text: 'Benin', value: 'BJ' },
    { text: 'Bermuda', value: 'BM' },
    { text: 'Bhutan', value: 'BT' },
    { text: 'Bolivia', value: 'BO' },
    { text: 'Bosnia and Herzegovina', value: 'BA' },
    { text: 'Botswana', value: 'BW' },
    { text: 'Bouvet Island', value: 'BV' },
    { text: 'Brazil', value: 'BR' },
    { text: 'British Indian Ocean Territory', value: 'IO' },
    { text: 'Brunei Darussalam', value: 'BN' },
    { text: 'Bulgaria', value: 'BG' },
    { text: 'Burkina Faso', value: 'BF' },
    { text: 'Burundi', value: 'BI' },
    { text: 'Cambodia', value: 'KH' },
    { text: 'Cameroon', value: 'CM' },
    { text: 'Canada', value: 'CA' },
    { text: 'Cape Verde', value: 'CV' },
    { text: 'Cayman Islands', value: 'KY' },
    { text: 'Central African Republic', value: 'CF' },
    { text: 'Chad', value: 'TD' },
    { text: 'Chile', value: 'CL' },
    { text: 'China', value: 'CN' },
    { text: 'Christmas Island', value: 'CX' },
    { text: 'Cocos (Keeling) Islands', value: 'CC' },
    { text: 'Colombia', value: 'CO' },
    { text: 'Comoros', value: 'KM' },
    { text: 'Congo', value: 'CG' },
    { text: 'Congo, The Democratic Republic of the', value: 'CD' },
    { text: 'Cook Islands', value: 'CK' },
    { text: 'Costa Rica', value: 'CR' },
    { text: "Cote D'Ivoire", value: 'CI' },
    { text: 'Croatia', value: 'HR' },
    { text: 'Cuba', value: 'CU' },
    { text: 'Cyprus', value: 'CY' },
    { text: 'Czech Republic', value: 'CZ' },
    { text: 'Denmark', value: 'DK' },
    { text: 'Djibouti', value: 'DJ' },
    { text: 'Dominica', value: 'DM' },
    { text: 'Dominican Republic', value: 'DO' },
    { text: 'Ecuador', value: 'EC' },
    { text: 'Egypt', value: 'EG' },
    { text: 'El Salvador', value: 'SV' },
    { text: 'Equatorial Guinea', value: 'GQ' },
    { text: 'Eritrea', value: 'ER' },
    { text: 'Estonia', value: 'EE' },
    { text: 'Ethiopia', value: 'ET' },
    { text: 'Falkland Islands (Malvinas)', value: 'FK' },
    { text: 'Faroe Islands', value: 'FO' },
    { text: 'Fiji', value: 'FJ' },
    { text: 'France', value: 'FR' },
    { text: 'French Guiana', value: 'GF' },
    { text: 'French Polynesia', value: 'PF' },
    { text: 'French Southern Territories', value: 'TF' },
    { text: 'Gabon', value: 'GA' },
    { text: 'Gambia', value: 'GM' },
    { text: 'Georgia', value: 'GE' },
    { text: 'Germany', value: 'DE' },
    { text: 'Ghana', value: 'GH' },
    { text: 'Gibraltar', value: 'GI' },
    { text: 'Greece', value: 'GR' },
    { text: 'Greenland', value: 'GL' },
    { text: 'Grenada', value: 'GD' },
    { text: 'Guadeloupe', value: 'GP' },
    { text: 'Guam', value: 'GU' },
    { text: 'Guatemala', value: 'GT' },
    { text: 'Guernsey', value: 'GG' },
    { text: 'Guinea', value: 'GN' },
    { text: 'Guinea-Bissau', value: 'GW' },
    { text: 'Guyana', value: 'GY' },
    { text: 'Haiti', value: 'HT' },
    { text: 'Heard Island and Mcdonald Islands', value: 'HM' },
    { text: 'Holy See (Vatican City State)', value: 'VA' },
    { text: 'Honduras', value: 'HN' },
    { text: 'Hong Kong', value: 'HK' },
    { text: 'Hungary', value: 'HU' },
    { text: 'Iceland', value: 'IS' },
    { text: 'India', value: 'IN' },
    { text: 'Indonesia', value: 'ID' },
    { text: 'Iran, Islamic Republic Of', value: 'IR' },
    { text: 'Iraq', value: 'IQ' },
    { text: 'Ireland', value: 'IE' },
    { text: 'Isle of Man', value: 'IM' },
    { text: 'Israel', value: 'IL' },
    { text: 'Italy', value: 'IT' },
    { text: 'Jamaica', value: 'JM' },
    { text: 'Japan', value: 'JP' },
    { text: 'Jersey', value: 'JE' },
    { text: 'Jordan', value: 'JO' },
    { text: 'Kazakhstan', value: 'KZ' },
    { text: 'Kenya', value: 'KE' },
    { text: 'Kiribati', value: 'KI' },
    { text: "Korea, Democratic People's Republic of", value: 'KP' },
    { text: 'Korea, Republic of', value: 'KR' },
    { text: 'Kuwait', value: 'KW' },
    { text: 'Kyrgyzstan', value: 'KG' },
    { text: "Lao People's Democratic Republic", value: 'LA' },
    { text: 'Latvia', value: 'LV' },
    { text: 'Lebanon', value: 'LB' },
    { text: 'Lesotho', value: 'LS' },
    { text: 'Liberia', value: 'LR' },
    { text: 'Libyan Arab Jamahiriya', value: 'LY' },
    { text: 'Liechtenstein', value: 'LI' },
    { text: 'Lithuania', value: 'LT' },
    { text: 'Luxembourg', value: 'LU' },
    { text: 'Macao', value: 'MO' },
    { text: 'Macedonia, The Former Yugoslav Republic of', value: 'MK' },
    { text: 'Madagascar', value: 'MG' },
    { text: 'Malawi', value: 'MW' },
    { text: 'Malaysia', value: 'MY' },
    { text: 'Maldives', value: 'MV' },
    { text: 'Mali', value: 'ML' },
    { text: 'Malta', value: 'MT' },
    { text: 'Marshall Islands', value: 'MH' },
    { text: 'Martinique', value: 'MQ' },
    { text: 'Mauritania', value: 'MR' },
    { text: 'Mauritius', value: 'MU' },
    { text: 'Mayotte', value: 'YT' },
    { text: 'Mexico', value: 'MX' },
    { text: 'Micronesia, Federated States of', value: 'FM' },
    { text: 'Moldova, Republic of', value: 'MD' },
    { text: 'Monaco', value: 'MC' },
    { text: 'Mongolia', value: 'MN' },
    { text: 'Montenegro', value: 'ME' },
    { text: 'Montserrat', value: 'MS' },
    { text: 'Morocco', value: 'MA' },
    { text: 'Mozambique', value: 'MZ' },
    { text: 'Myanmar', value: 'MM' },
    { text: 'Namibia', value: 'NA' },
    { text: 'Nauru', value: 'NR' },
    { text: 'Nepal', value: 'NP' },
    { text: 'Netherlands', value: 'NL' },
    { text: 'Netherlands Antilles', value: 'AN' },
    { text: 'New Caledonia', value: 'NC' },
    { text: 'New Zealand', value: 'NZ' },
    { text: 'Nicaragua', value: 'NI' },
    { text: 'Niger', value: 'NE' },
    { text: 'Nigeria', value: 'NG' },
    { text: 'Niue', value: 'NU' },
    { text: 'Norfolk Island', value: 'NF' },
    { text: 'Northern Mariana Islands', value: 'MP' },
    { text: 'Norway', value: 'NO' },
    { text: 'Oman', value: 'OM' },
    { text: 'Pakistan', value: 'PK' },
    { text: 'Palau', value: 'PW' },
    { text: 'Palestinian Territory, Occupied', value: 'PS' },
    { text: 'Panama', value: 'PA' },
    { text: 'Papua New Guinea', value: 'PG' },
    { text: 'Paraguay', value: 'PY' },
    { text: 'Peru', value: 'PE' },
    { text: 'Philippines', value: 'PH' },
    { text: 'Poland', value: 'PL' },
    { text: 'Portugal', value: 'PT' },
    { text: 'Puerto Rico', value: 'PR' },
    { text: 'Qatar', value: 'QA' },
    { text: 'Romania', value: 'RO' },
    { text: 'Russian Federation', value: 'RU' },
    { text: 'RWANDA', value: 'RW' },
    { text: 'Saint Helena', value: 'SH' },
    { text: 'Saint Kitts and Nevis', value: 'KN' },
    { text: 'Saint Lucia', value: 'LC' },
    { text: 'Saint Pierre and Miquelon', value: 'PM' },
    { text: 'Saint Vincent and the Grenadines', value: 'VC' },
    { text: 'Samoa', value: 'WS' },
    { text: 'San Marino', value: 'SM' },
    { text: 'Sao Tome and Principe', value: 'ST' },
    { text: 'Saudi Arabia', value: 'SA' },
    { text: 'Senegal', value: 'SN' },
    { text: 'Serbia', value: 'RS' },
    { text: 'Seychelles', value: 'SC' },
    { text: 'Sierra Leone', value: 'SL' },
    { text: 'Singapore', value: 'SG' },
    { text: 'Slovakia', value: 'SK' },
    { text: 'Slovenia', value: 'SI' },
    { text: 'Solomon Islands', value: 'SB' },
    { text: 'Somalia', value: 'SO' },
    { text: 'South Africa', value: 'ZA' },
    { text: 'South Georgia and the South Sandwich Islands', value: 'GS' },
    { text: 'Spain', value: 'ES' },
    { text: 'Sri Lanka', value: 'LK' },
    { text: 'Sudan', value: 'SD' },
    { text: 'Suriname', value: 'SR' },
    { text: 'Svalbard and Jan Mayen', value: 'SJ' },
    { text: 'Swaziland', value: 'SZ' },
    { text: 'Sweden', value: 'SE' },
    { text: 'Switzerland', value: 'CH' },
    { text: 'Syrian Arab Republic', value: 'SY' },
    { text: 'Taiwan, Province of China', value: 'TW' },
    { text: 'Tajikistan', value: 'TJ' },
    { text: 'Tanzania, United Republic of', value: 'TZ' },
    { text: 'Thailand', value: 'TH' },
    { text: 'Timor-Leste', value: 'TL' },
    { text: 'Togo', value: 'TG' },
    { text: 'Tokelau', value: 'TK' },
    { text: 'Tonga', value: 'TO' },
    { text: 'Trinidad and Tobago', value: 'TT' },
    { text: 'Tunisia', value: 'TN' },
    { text: 'Turkey', value: 'TR' },
    { text: 'Turkmenistan', value: 'TM' },
    { text: 'Turks and Caicos Islands', value: 'TC' },
    { text: 'Tuvalu', value: 'TV' },
    { text: 'Uganda', value: 'UG' },
    { text: 'Ukraine', value: 'UA' },
    { text: 'United Arab Emirates', value: 'AE' },
    { text: 'United States Minor Outlying Islands', value: 'UM' },
    { text: 'Uruguay', value: 'UY' },
    { text: 'Uzbekistan', value: 'UZ' },
    { text: 'Vanuatu', value: 'VU' },
    { text: 'Venezuela', value: 'VE' },
    { text: 'Viet Nam', value: 'VN' },
    { text: 'Virgin Islands, British', value: 'VG' },
    { text: 'Virgin Islands, U.S.', value: 'VI' },
    { text: 'Wallis and Futuna', value: 'WF' },
    { text: 'Western Sahara', value: 'EH' },
    { text: 'Yemen', value: 'YE' },
    { text: 'Zambia', value: 'ZM' },
    { text: 'Zimbabwe', value: 'ZW' }
  ];
  const getRecordCountry = (event, { value }) => {
    event.preventDefault();
    setRecordCountry(value);
  };
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <Modal
      open={modalOpen}
      closeIcon
      trigger={
        <Button color="blue" onClick={handleOpen}>
          Lisää uusi biisi
        </Button>
      }
      onClose={handleClose}
    >
      <Header content="Lisää uusi biisi" />
      <Modal.Content>
        <Form onSubmit={submitTrack}>
          <Form.Field>
            <label>
              Artisti{' '}
              <span style={{ color: 'red' }}>
                <strong>*</strong>
              </span>
            </label>
            <Input
              value={artist}
              type="text"
              placeholder="Artisti..."
              onChange={e => setArtist(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>
              Albumi
              <span style={{ color: 'red' }}>
                <strong>*</strong>
              </span>
            </label>
            <Input
              value={album}
              type="text"
              placeholder="Albumi..."
              onChange={e => setAlbum(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>
              Biisi
              <span style={{ color: 'red' }}>
                <strong>*</strong>
              </span>
            </label>
            <Input
              value={track}
              type="text"
              placeholder="Biisi..."
              onChange={e => setTrack(e.target.value)}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Kesto - minuutit
                <span style={{ color: 'red' }}>
                  <strong>*</strong>
                </span>
              </label>
              <Input
                maxLength={4}
                value={min}
                type="number"
                placeholder="Minuuttia..."
                onChange={e => setMin(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>
                Kesto - sekunnit
                <span style={{ color: 'red' }}>
                  <strong>*</strong>
                </span>
              </label>
              <Input
                value={sec}
                maxLength={2}
                type="number"
                placeholder="Sekuntia..."
                onChange={e => setSec(e.target.value)}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Levy#
                <span style={{ color: 'red' }}>
                  <strong>*</strong>
                </span>
              </label>
              <Input
                maxLength={2}
                value={discNo}
                type="number"
                placeholder="CD1=1, CD2=2, A1=1, A2=2..."
                onChange={e => setDiscNo(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>
                Biisi#
                <span style={{ color: 'red' }}>
                  <strong>*</strong>
                </span>
              </label>
              <Input
                value={trackNo}
                maxLength={2}
                type="number"
                placeholder="Biisi #..."
                onChange={e => setTrackNo(e.target.value)}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Tekijät - max 5kpl, yksi per rivi, SUKUNIMI ETUNIMI</label>
            <TextArea
              onChange={e => setPeople(e.target.value)}
              placeholder="Tekijät - max 5kpl"
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Säveltäjän kotimaa
                <span style={{ color: 'red' }}>
                  <strong>*</strong>
                </span>
              </label>
              <Dropdown
                placeholder="Suomi, muu, ei tietoa..."
                openOnFocus={false}
                value={country}
                selection
                options={countryOptions}
                onChange={getCountry}
              />
            </Form.Field>
            <Form.Field>
              <label>Tallennusmaa</label>
              <Dropdown
                placeholder="Valitse tallennusmaa..."
                openOnFocus={false}
                value={recordCountry}
                selection
                search
                options={recordCountryOptions}
                onChange={getRecordCountry}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>
              Levymerkki
              <span style={{ color: 'red' }}>
                <strong>*</strong>
              </span>
            </label>
            <Input
              value={label}
              type="text"
              placeholder="Levymerkki..."
              onChange={e => setLabel(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>
              Levykoodi
              <span style={{ color: 'red' }}>
                <strong>*</strong>
              </span>
            </label>
            <Input
              value={catId}
              type="text"
              placeholder="Levykoodi..."
              onChange={e => setCatId(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>ISRC</label>
            <Input
              value={isrc}
              maxLength={12}
              type="text"
              placeholder="ISRC..."
              onChange={e => setIsrc(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>
              Vuosi
              <span style={{ color: 'red' }}>
                <strong>*</strong>
              </span>
            </label>
            <Input
              value={year}
              maxLength={4}
              type="number"
              placeholder="Vuosi..."
              onChange={e => setYear(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Lisätietoa</label>
            <TextArea
              onChange={e => setComment(e.target.value)}
              placeholder="Lisätietoa..."
            />
          </Form.Field>
          <Button
            disabled={
              !artist ||
              !album ||
              !track ||
              !trackNo ||
              !discNo ||
              !min ||
              !sec ||
              !label ||
              !catId ||
              !year
            }
            color="green"
            type="submit"
          >
            Tallenna ja lisää raporttiin
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    report: state.report,
    reportsList: state.reportsList
  };
};
const connectedAddTrackModal = connect(
  mapStateToProps,
  { setNotification }
)(AddTrackModal);

export default connectedAddTrackModal;
