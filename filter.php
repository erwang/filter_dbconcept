<?php
// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

class filter_dbconcept extends moodle_text_filter {

    public function filter($text, array $options = array()) {
        global $PAGE, $CFG;

        if (!is_string($text) || empty($text)) {
            return $text;
        }

        $re = "~\[dbconcept(.*?)\](.*?)\[\/dbconcept\]~isu";
        $result = preg_match_all($re, $text, $matches);
        if ($result > 0) {
            foreach ($matches[2] as $idx => $code) {
                $code = nl2br(strip_tags(str_replace('<br>', PHP_EOL, $code)));
                $type = $matches[1][$idx] == '' ? 'MCD' : $matches[1][$idx];
                $text = str_replace($matches[0][$idx], '<div class="dbconcept" data-type="'.$type.'">'.$code.'</div>', $text);
            }

        }
        return $text;
    }

    public function setup($page, $context) {
        global $CFG;
        $page->requires->js( new moodle_url($CFG->wwwroot . '/filter/dbconcept/javascript/dbconcept.js'));
        $page->requires->js( new moodle_url($CFG->wwwroot . '/filter/dbconcept/javascript/app.js'));
    }
}
